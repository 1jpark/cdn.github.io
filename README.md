---
title: Rsync
category: CLI
layout: 2017/sheet
weight: -1
---

### Basic example
{: .-prime}

```bash
rsync -avz ./src /dest
```

### OSX

```bash
--exclude '.Trashes'
--exclude '.Spotlight-V100'
--exclude '.fseventsd'
```

### Transfer options

```bash
-z, --compress
-n, --dry-run
```

### Display options

```bash
-q, --quiet
-v, --verbose
-h, --human-readable
    --progress
```

### Skipping options

```bash
-u, --update     # skip files newer on dest
-c, --checksum   # skip based on checksum, not mod-time & size
```

### Backup options

```bash
-b, --backup           # backup with suffix
    --suffix=SUFFIX    # default ~ without --backup-dir
    --backup-dir=DIR
```

### Include options

```bash
--exclude=PATTERN
--include=PATTERN
```

```bash
--exclude-from=FILE
--include-from=FILE
--files-from=FILE    # read list of filenames from FILe
```

### Archive options

```bash
-a, --archive    # archive (-rlptgoD)
```

```bash
-r, --recursive
-l, --links      # copy symlinks as links
-p, --perms      # preserve permissions
-t, --times      # preserve times
-g, --group      # preserve group
-o, --owner      # preserve owner
-D               # --devices --specials
```

```bash
--delete         # Delete extra files
```


# Júne's Webby Repository 
URL: https://cdn.meson.one/

Stores ... 
1. OpenGraph images 
2. Signature images for email / message 
3. Social network images for signatures 
4. Presentative images for blogger 

# Items to be deleted soon 
1. <del>[sig] folder</del>
2. <del>[signatures] folder</del>
3. images/socials folder 
4. images/socials.tiny folder 
