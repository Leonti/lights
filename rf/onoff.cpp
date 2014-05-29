/* 
 *
 *  
 *  CE is connected to GPIO25
 *  CSN is connected to GPIO8 
 *
 *  Refer to RPi docs for GPIO numbers
 *
 */

#include <cstdlib>
#include <iostream>
#include "RF24.h"

using namespace std;

// CE and CSN pins On header using GPIO numbering (not pin numbers)
RF24 radio("/dev/spidev0.0",8000000,25);  // Setup for GPIO 25 CSN

void send(uint64_t id, int on)
{
	//
	// Refer to RF24.h or nRF24L01 DS for settings
	radio.begin();
	radio.enableDynamicPayloads();
	radio.setAutoAck(1);
	radio.setRetries(15,15);
	radio.setDataRate(RF24_1MBPS);
	radio.setPALevel(RF24_PA_MAX);
	radio.setChannel(76);
	radio.setCRCLength(RF24_CRC_16);

	radio.stopListening();
	radio.openWritingPipe(id);

	usleep(1000);

	char sendPayload[32];

	if (on) {
		strcpy(sendPayload, "on");
	} else {
		strcpy(sendPayload, "off");
	}

	if(radio.write(sendPayload, 32)) {
		printf("OK\n");
	} else {
		printf("ERROR\n");
	}
}


int main(int argc, char** argv) 
{

	if (argc > 2) {

        char *end;
        uint64_t id = strtoull(argv[1], &end, 16);

        int on = 0;
        if (!strcmp("on", argv[2])) {
            on = 1;
        }
		send(id, on);
	} 
	return 0;
}

