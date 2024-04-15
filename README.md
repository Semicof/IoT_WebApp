# IoT Web Application

This web application enables users to monitor sensors measuring temperature, humidity, and brightness that are connected to an MQTT broker. Users can toggle connected devices on/off and view sensor data or device statuses stored in a database.

## Features

- **Sensor Monitoring**: Track real-time data from temperature, humidity, and brightness sensors.
- **Device Control**: Control connected devices by toggling them on or off.
- **Data Storage**: Save sensor data and device statuses to a database for future reference.
- **User Interface**: Intuitive interface for easy navigation and interaction. 

## Installation
### 1. Clone the repository
```bash
git clone https://github.com/Semicof/IoT_WebApp.git
```
### 2. Install Dependencies
#### Front-end
```bash
cd IoT_WebApp/Front-end
npm i
```
#### Back-end
```bash
cd IoT_WebApp/Back-end
npm i
```
### 3. Run the App
#### IoT part
##### Broker:
- Install Mosquitto (an MQTT broker).
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/2a28cd02-d4f7-4d30-a154-60ecbd4e0c6e)
- Inside mosquitto folder, open the "mosquitto.conf" file and add these 3 lines to it:
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/7ca16e5c-a9cf-4394-aa4d-745f964fd123)
- Open terminal on that folder then run this comand line:
```bash
mosquitto_passwd -c passwordfile_link user
```
This adds the user to the password file.
Then you will be prompted to enter a password for the user.
**Notice**: Here I put password file in "D:" but you can put it everywhere you want.
Now you can use the command:
```bash
mosquitto_passwd -b passwordfile_link user password
```
to add additional users to the file.
The password file after I create one user and add another user :
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/09be8188-aa7b-47e1-b3df-a5291d1146c4)
##### Arduino:
- Connect device to your computer.
- Install Arduino IDE
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/5a86f069-f52e-4410-97af-695f9cb24952)
- Open the 'b4_1.ino' file in Arduino IDE application. It should look like this:
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/2189cad6-134e-4b20-8d95-59d1a239bc9f)
- Change the wifi info base on yours at these line:
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/508f8bda-cfcc-42ee-a372-4b8b69f9231d)
- Upload the code to device, then click to "Serial Mornitor" button on the top-right. The data will be displayed:
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/1ab63c87-feaa-4027-9def-41ed506a7a18)
The hardware part is done.
#### Front-end
```bash
cd IoT_WebApp/Front-end
npm run dev
```
#### Back-end
```bash
cd IoT_WebApp/Back-end
npm run dev
```
## Usage
### Dashboard screen
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/c8a5ee7f-1beb-447a-95f2-118b05ac3f11)
You can see all sensors data here watch the chart base on those data and toggle the devices.
### Sensor data screen
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/1bc70bb2-829b-46ee-9e19-edcb29f4f25a)
Here's the table of sensor data, you can search and sort by any colum inside that table.
### Action history screen
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/6b271add-e01d-4417-957e-804a4cf8fb3f)
Here's the table of action history, you can search and sort by any colum inside that table.
### Profile screen
![image](https://github.com/Semicof/IoT_WebApp/assets/91484227/dc8e7a07-5e9f-4ef9-8ca9-3d96eb6822ef)
Here's my profile page.
## API Documentation
[Read API documentation here](https://documenter.getpostman.com/view/23176583/2sA358cQaK)
## Upcomming features
- **Login/Signup.**
- **Add more devices, sensors.**
- **Toggle devices by voice.**



