# Node JS Benchmarking Using AutoCannon to the Max!
**24,927 reqs in 80 seconds. 343k req/s on a single machine!**

AutoCannon is a HTTP/1.1 benchmarking tool written in Node JS and is the most powerful HTTP stress tester I have come accross. This stress tester is able to send over 1 million req's a second on a single machine when clustered!
You can try and test it yourself using the examples. I haven't managed to get any other benchmarking tool to send large amounts of requests without other benchmarking tools busting the cpu when sending.
***Test results Below!***

### Notes
    - Please see our Maximum Capabilities section to learn about the limits and the most req's you can potentially get depending on environment. Where is your bottleneck?

### Examples
*This was tested on Node 10.14.2 LTS. May not work on older versions.*
Requires the Dependecy [AutoCannon](https://github.com/mcollina/autocannon)

| Directories | Description |
| ------ | ------ |
| BenchMark | The folder with our AutoCannon Benchmarking App Clustered.  |
| Server | The Example Node JS Clustered http server to Benchmark |

### Installation
Download NodeJsBench and Navigate to the Server Direcotry and open app.js then edit the `numCPUs = 2;` To your desired number, **Must not exceed amount of logical Processors.** *Please leave some CPU's for BenchMark to use to send the req's. If you have 4 cpu's try 2 on both or if you have 6, try 4 for the server 2 for the BenchMark.*
Once done make sure you are inside the Server Directory and in your terminal/cmd run.
```sh
node app.js
```
You should see NodeJS worker listening on port 3000 x number of CPU's confirming the server has started.
Once the server has started navigate to the BenchMark Direcotry and Install the dependencies. AutoCannon is the only Dependency and it will install automatically by using.
```sh
npm install
```
You can also install AutoCannon globally which will allow you to benchmark from the terminal.
```sh
npm install autocannon -g
```
Once installed inside the BenchMark directory open the app.js file and edit the `numCPUs = 3;` To your desired number.
**Must not exceed amount of logical Processors combined with the amount you assigned to the Server.**
*Depending on the speed of your single cluster cpu and the amount of req's your server can handle you basically just want to use the amount of CPU's for the max amount of req's the server can handle. For example when running on a single cluster the server was not using 100% procesing to process the req's but autocannon on a single cluster was, seems the server could handle more, so we changed it to 2 so we could send more requests and eventually upto 4 for maximum effect for our test environment. Adjusting this to max is pointless unless your server can handle it as you will be spreading it out over serveral reports that you have to add up.*
#### Start the test
Once done make sure you are inside the BenchMark Directory and in your terminal/cmd run.
```sh
node app.js
```
You can start the bench with the default settings I have used inside the bench.js file.
If all the clusters you assigned to the Bench are using over 100% CPU this means you need to turn it down by adjusting the -c and -p.. -d Is the duration 80s is good! Usually you will see the loading bar freeze if the setting is too high. Check how much cpu your server is using, if its not using 100% on all the clusters then make sure AutoCannon is maxing out the CPU without freezing by adjusting the values and change the numCPUs to add more clusters. *Make sure you adjust the server to correspond to the amount you have in total.* In our test we used 4 clusters to max the Servers CPU.
#### Your Results
Once you have finished the test you will get your results, if you ran this on multiple clusters then you can just add each result up as it will output them to the console one after the other. This can take some tweaking and trial and error with the settings to reach peak performance with your server. But once you have a little play you start to see its capabilities.
___
## My Test Results
### Server on a 100mbit Link
`Settings -c 300 -d 80 -p 400`
This test was done where AutoCannon was fired from a different machne than the server was running on, so the server had 100% CPU to cope with the requests cause autocannon gets CPU hungry when your server wants to eat.
| Resource Usage | AutoCannon Results |
| -------------- | ------- |
|![resource1](https://i.imgur.com/qtwmUPZ.png)| ![result1](https://i.imgur.com/Sag3hYp.png) |
As you can see the server is using 8 cores and they ae all maxed out. The network is also maxed out on 100mbit. Seems here our CPU and network both top out at the same time... Nice... Below is the resource usage for AutoCannon I ran Autocannon from Windows 10, which was firing at a linux server. Then we have our Auto Cannon results on the right. As we can see we have completely maxed out our network with the 100mbit connection being completly used up and with this we got 105 req's a second with a total of 8.1 million requests in 80 seconds. Now that's pretty impressive! Specs are below. 
### More powerful Server no link localhost.
`Settings -c 100 -d 80 -p 100`
For this test I had a total of 12 Logical Processors so I used 8 for the server and 4 for the BenchTest.
| Resource Usage | AutoCannon Results |
| -------------- | ------- |
| ![BenchTest2](https://i.imgur.com/0Cr7HgO.png) | ![BenchTest2](https://i.imgur.com/xDNF9s9.png) |
I needed to run the test on 4 clussters because on one cluster the maxmimum amount of requests I could send was 100k which was what we got from our previous test on our smaller server. Autocannon nearly used all the CPU's on 4 of its clusters and so did the server with 8 clusters. So we literally maxed out the CPU out sending the req's and recieving them on the server. This resulted in a whooping **24,927 reqs in 80 seconds. 343k req/s on a single machine!** Truely Amazing, considering were only testing nodes basic http server.
___
## Maxmimum Capabilities (**)
I have tested this on multiple machines and the results all lead to this conclusion, it seems using Node JS with the built in Node HTTP server, if you're on a 100mbit connection, the maximum amount of requests your server can recieve is 100k a second and 10-11mbs transfer *approximately.* ***This does need to be tested by someone else to fully verify.. Could be something in my environment....*** So you could load balance a few 100mbit servers or simply upgrade your link speed to say 1gbit to beable to send the server more requests. That's if you are sending the requests from a machine that the server is not on. If you're doing the benchmarking on the same machine as the server you don't have to worry about these limits.
___
## Notes
Its probably best to put the server on one machine and run the test from another so you can get the true value of what is being passed to the network and you can find where the true bottleneck will lie. As I have found out here the limit was on the actual link speed. I couldn't handle any more data being passed through so we hit our bottleneck there with 100k req/s on our first server test. We send almost 4 times as many on a bigger server.
___
## Computer Specification used for the test
| Small Server 100mbit 8 clusters | Larger Server 12 clusters |
| ------------------------------- | ------------------------- |
| i7-3632QM 4 core 2.2ghz Turbo Boost upto 3.2ghz | Motherboard Asus x99-Deluxe |
| 6GB DDR3 Ram | CPU i7 5820k 6 core 3.3ghz clocked to 4.2ghz Stable |
| 500gb HDD| GPU Nvidia GTX 970 Zotac |
|| RAM 16gb DDR4 Corsair Vengeance.|
||Power Supply Corsair CX 600|
|| Cooler Water Cooled Corsair H75 |
|| HDD Samsung Evo 500gb, 250gb & 160gb SSD |
## License
Licensed under MIT.
