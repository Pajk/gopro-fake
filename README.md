# GoPro Fake Server #

GoPro Hero 4 very basic API is implemented:

* shutter - /gp/gpControl/command/shutter
* change mode - /gp/gpControl/command/mode
* status - /camera/se
* media library - /videos/DCIM/100GOPRO/
* image preview - /videos/DCIM/100GOPRO/GOPR.*?\.THM

Use the first argument to specify the port `node server.js 8900`

