# GoPro Fake Server #

So far only GoPro Hero 4 very basic API is implemented:

* shutter - /gp/gpControl/command/shutter
* change mode - /gp/gpControl/command/mode
* status - /camera/se
* media library - /videos/DCIM/100GOPRO/
* image preview - /videos/DCIM/100GOPRO/GOPR.*?\.THM


Use the first argument to specify port:
```
#!bash

node server.js 8900
```