#!/bin/bash

touch "$1"
rm "$1"
touch "$1"
echo "----properties-----" >> "$1"
cat electron.vite.config.ts >> "$1"
echo -e "\n----------project files-----------" >> "$1"
#cat src/main/java/com/reclament/resource_server/ResourceServerApplication.java >> "$1"
echo "" >> "$1"



TOPDIR=$(pwd)
find src/ -name "*.ts" -type f | while read file; do

    echo "$file" >> "$TOPDIR/$1"
    echo "--------------------------------">> "$TOPDIR/$1"
    cat "$file" >> "$TOPDIR/$1"
    echo "\n" >>  "$TOPDIR/$1"
    echo "--------------------------------" >> "$TOPDIR/$1"
done
find src/ -name "*.tsx" -type f | while read file; do
    echo "$file" >> "$TOPDIR/$1"
    echo "--------------------------------" >> "$TOPDIR/$1"
    cat "$file" >> "$TOPDIR/$1"
    echo "--------------------------------" >> "$TOPDIR/$1"
done

find src/ -name "*.css" -type f | while read file; do

    echo "$file" >> "$TOPDIR/$1"
    echo "--------------------------------">> "$TOPDIR/$1"
    cat "$file" >> "$TOPDIR/$1"
    echo "--------------------------------" >> "$TOPDIR/$1"
done


find . -maxdepth 1 -name "*.json" -type f | while read file; do

    if [ "$file" != "./package-lock.json" ]; then
     echo "$file" >> "$TOPDIR/$1"
     echo "--------------------------------">> "$TOPDIR/$1"
     cat "$file" >> "$TOPDIR/$1"
     echo "--------------------------------" >> "$TOPDIR/$1"
    fi

done





echo "THE PROJECT IS FORMATTED LIKE SO:" >> "$1"
echo ".
├──src
│  ├──main
│  │  ├──index.ts
│  │  └──...
│  ├──preload
│  │  ├──index.ts
│  │  └──...
│  └──renderer    # with vue, react, etc.
│     ├──src
│     ├──index.html
│     └──...
├──electron.vite.config.ts
├──package.json
└──..." >> "$1"
echo "" >> "$1"

