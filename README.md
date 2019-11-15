gibu
====
> A command line utility that will "gibu" you the file or file name you want.

Installation
------------
```bash
npm install gibu --global
```

Usage
-----
> For "no-install" usage, use `npx gibu <path> [options]`

Copy the NSE script name for use with "nmap $IP --script <paste here>"
```bash
gibu /usr/share/nmap/scripts --remove-extension
```

Copy path to wordlist for use with hydra, medusa, gobuster, etc...
```bash
gibu /usr/share/wordlist --absolute
```

Copy exploit content to clipboard
```bash
gibu /usr/share/exploitdb/exploits --content
```

Why "gibu"?
-----------
> "gibu" (ギブ) means "give" in Japanese, also it is a short word that is easy to type ;)

I made this tool while preparing for the [OSCP exam](https://www.offensive-security.com/pwk-oscp/). It saved me some time and effort, so I decided to share it.