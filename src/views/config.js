export const data = [
  {
    id: "node1",
    x: 40,
    y: 40,
    width: 100,
    height: 40,
    label: "Hello",
    shape: "rect",
  },
  {
    id: "node2",
    x: 400,
    y: 400,
    width: 100,
    height: 40,
    label: "Hello",
    shape: "rect",
  },
  {
    id: "edge1",
    source: "node1",
    target: "node2",
    shape: "edge",
    router: {
      name: 'er',
      args: {
        offset: 'center',
      }
    }
  },
]

export const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}

export const cells = [
  {
      "position": {
          "x": 40,
          "y": 40
      },
      "size": {
          "width": 100,
          "height": 40
      },
      "attrs": {
          "text": {
              "text": "Hello"
          }
      },
      "visible": true,
      "shape": "rect",
      "id": "node1",
      "ports": {
          "groups": {
              "top": {
                  "position": "top",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "right": {
                  "position": "right",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "bottom": {
                  "position": "bottom",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "left": {
                  "position": "left",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              }
          },
          "items": [
              {
                  "group": "top",
                  "id": "165faa53-a496-4b2a-8966-be22dba136f9"
              },
              {
                  "group": "right",
                  "id": "544edbaf-2788-4099-bf9b-75c577ba6743"
              },
              {
                  "group": "bottom",
                  "id": "8382d4ef-b8e6-4168-bcd7-936474253e52"
              },
              {
                  "group": "left",
                  "id": "072db40e-4b0e-45dc-a9b2-b34f3fbb7d56"
              }
          ]
      },
      "zIndex": 1
  },
  {
      "position": {
          "x": 610,
          "y": 150
      },
      "size": {
          "width": 100,
          "height": 40
      },
      "attrs": {
          "text": {
              "text": "Hello"
          }
      },
      "visible": true,
      "shape": "rect",
      "id": "node2",
      "ports": {
          "groups": {
              "top": {
                  "position": "top",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "right": {
                  "position": "right",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "bottom": {
                  "position": "bottom",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              },
              "left": {
                  "position": "left",
                  "attrs": {
                      "circle": {
                          "r": 4,
                          "magnet": true,
                          "stroke": "#5F95FF",
                          "strokeWidth": 1,
                          "fill": "#fff",
                          "style": {
                              "visibility": "hidden"
                          }
                      }
                  }
              }
          },
          "items": [
              {
                  "group": "top",
                  "id": "10470b33-90ba-4f4d-9bd2-f44e4b47d278"
              },
              {
                  "group": "right",
                  "id": "cdc781b8-9b93-4efb-950a-d6a82bc33ebe"
              },
              {
                  "group": "bottom",
                  "id": "82933369-b9b0-413d-bbc3-0eb5e43a6c56"
              },
              {
                  "group": "left",
                  "id": "b9521922-f3a5-4684-8abe-1d040bc426b6"
              }
          ]
      },
      "zIndex": 1
  },
  {
      "shape": "edge",
      "id": "edge1",
      "source": {
          "cell": "node1"
      },
      "target": {
          "cell": "node2"
      },
      "zIndex": 1
  },
  {
      "shape": "edge",
      "attrs": {
          "line": {
              "stroke": "#8f8f8f",
              "strokeWidth": 1
          }
      },
      "id": "ceb3c098-4632-49d8-9ece-fba4c5eda66e",
      "source": {
          "cell": "node1",
          "port": "165faa53-a496-4b2a-8966-be22dba136f9"
      },
      "target": {
          "cell": "node2",
          "port": "10470b33-90ba-4f4d-9bd2-f44e4b47d278"
      },
      "zIndex": 2
  },
  {
      "shape": "edge",
      "attrs": {
          "line": {
              "stroke": "#8f8f8f",
              "strokeWidth": 1
          }
      },
      "id": "4cfeffbe-db19-4836-9639-5430d1912cb1",
      "source": {
          "cell": "node1",
          "port": "8382d4ef-b8e6-4168-bcd7-936474253e52"
      },
      "target": {
          "cell": "node2",
          "port": "b9521922-f3a5-4684-8abe-1d040bc426b6"
      },
      "zIndex": 3
  }
]