# MagicMirror² Module: fineDust
Simply displays air pollution status in <del>Korean</del> English(update 26.8.2020). It shows the level of the pollution depends on the type.
<img src="https://user-images.githubusercontent.com/67196344/91318890-b140b380-e7f6-11ea-87ba-57987fda3ea9.png" width=40%>

This module is based on AirVisual API. Get an APIkey, write it in config, then it's all done.

## Installation
    cd ~/MagicMirror/modules
    git clone https://github.com/bobaejeon/fineDust.git
    cd fineDust
    npm install

## Configuration
Add this module to the modules array in the config/config.js.    You can copy this and make some changes:
``````
    {
        module: 'fineDust',
        position: 'top_right',
        config: {
                    //stated below
                }
    },
``````

### Configuration options
|Option|Description|Possible values|
|------|---|---|
|apiKey|[required] The AirVisual APIKey to get the pollution data.<br><br><b>Default:</b> null|APIkey you've got from AirVisual|
|updateInterval|[optional] How often the information will be updated.<br><br><b>Default:</b> 10 * 60 * 1000 // every 10 minutes|60 * 1000 // every minute|
|animationSpeed|[optional] The speed of the update animation in milliseconds. <br><br><b>Default:</b> 1000 // 1 second|500 // 0.5 second|
