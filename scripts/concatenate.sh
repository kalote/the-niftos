#!/bin/bash

current=$(pwd)
jsonFolder="${current}/batch-upload/final"
jsonArray=$(find ${jsonFolder} -type f -name '*.json')
outputfile="$current/output.json" 
echo "[" > $outputfile
for file in $jsonArray
do
  cat $file >> $outputfile
  echo "," >> $outputfile
done
echo "]" >> $outputfile