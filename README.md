# Made by Nina with help of ChatGPT. DO NOT DISTRIBUTE

## JSON notes:
- nodes:
  - `x` - the x coordinate
  - `y` - the y coordinate
  - `radius` - the node radius **(DOESN'T AFFECT FA)**
- edges:
  - `source` - id of source node
  - `target` - id of target node
  - `width` - weight of edge
  - **it is `width`, not `weight`!!**

# example JSON:
```json
{
    "p": {
        "x": 50,
        "y": 20,
        "radius": 10
    },
    "q": {
        "x": 20,
        "y": 50,
        "radius": 15
    },
    "r": {
        "x": 40,
        "y": -10,
        "radius": 12
    }
}
```
```json
{
    "a": {
        "source": "p",
        "target": "q",
        "width":1
    },
    "b": {
        "source": "r",
        "target": "q",
        "width": 1
    }
}
```

# *THIS IS AN EARLY AND VERY CRUDE WIP*


## [contact](https://discord.gg/GBZXANb6nu) (discord link)

