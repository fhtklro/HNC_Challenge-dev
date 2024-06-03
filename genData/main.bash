#!/bin/bash

ARGLIST="2 3 5 7 11 13"

for ARG in ${ARGLIST}; do
    python3 main.py ${ARG} > _${ARG}x
    cat _${ARG}x | sort | uniq > ${ARG}x

done
