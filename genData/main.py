from sympy import isprime
from itertools import product
from sys import argv

args = argv

try :
    C_VALUE = int(argv[1])

except :
    C_VALUE = 2 


CARD5SINGLE = product('a23456789tjqk', repeat=5)
CARD5DOUBLE = product('a23456789tjqk', repeat=5)

ORDER= ['a', '2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k']

def cardToNum(c) :
    return int(c.replace('a', '1')  \
                .replace('t', '10') \
                .replace('j', '11') \
                .replace('q', '12') \
                .replace('k', '13') )

def numToCard(n) :
    return str(n).replace('13', 'k')  \
                .replace('12', 'q') \
                .replace('11', 'j') \
                .replace('10', 't') \
                .replace('1', 'a')

def deckCheck(hand) :
    for c in ORDER :
        if hand.count(c) >= 5 :
            return False

    return True

def main() :
    single = { cardToNum("".join(s)) : "".join(s) \
               for s in CARD5SINGLE if isprime(cardToNum("".join(s))) }

    double = { cardToNum("".join(d)) // C_VALUE : "".join(d) \
               for d in CARD5DOUBLE if  cardToNum("".join(d)) % C_VALUE == 0 \
                                    and isprime(cardToNum("".join(d)) // C_VALUE) }

    for sn in single :
        try :
            hand = list(single[sn] + double[sn] + numToCard(C_VALUE))
            if isprime(sn) and deckCheck(hand) :
                hand = sorted(hand, key=ORDER.index)
                # print("".join(hand).upper())
                print("[DEBUG]", "".join(hand).upper(), single[sn].upper(), double[sn].upper())

        except :
            pass

if __name__ == '__main__' :
    main()