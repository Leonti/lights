Each light has Atmega328p with nRF24L01(+) 2.4GHz Wireless Transceiver and relay attached to it.
When atmega turns on it switches the relay.
Upon receiving a command on/off it switches a relay accordingly.
It allows for remote operation as well as manual.

Raspberry Pi has node.js server going on which displays the page with buttons and executes command line util which
sends commands to lights.
Server is hardcoded at the moment to work with 4 lights (or other load).
