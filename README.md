gibu
====
[![npm](https://img.shields.io/npm/v/gibu?style=for-the-badge)](https://www.npmjs.com/package/gibu)
[![Travis (.org)](https://img.shields.io/travis/jhwohlgemuth/gibu?style=for-the-badge)](https://travis-ci.org/jhwohlgemuth/gibu)
[![Codecov](https://img.shields.io/codecov/c/github/jhwohlgemuth/gibu?style=for-the-badge)](https://codecov.io/gh/jhwohlgemuth/gibu)
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

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjhwohlgemuth%2Fgibu.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjhwohlgemuth%2Fgibu?ref=badge_large)