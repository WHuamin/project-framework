<template>
  <div>
    <div class="basic-map" ref="visualDataMap"></div>
  </div>
</template>
<script>
import 'echarts-gl';
import beijing from '@/constant/mapJson/beijing.json';
const $echarts = require('echarts');

export default {
  name: 'visual-data',
  data() {
    return {
      beijingArea: {}
    };
  },
  created() {
    const beijingAreaMaps = {};
    beijing.features.forEach((item) => {
      const { adcode, name, center } = item.properties;
      beijingAreaMaps[adcode] = { name, value: center };
    });
    this.beijingArea = beijingAreaMaps;
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    handleMapData(mapData = []) {
      const beijingArea = this.beijingArea;
      return mapData.map(({ id, count }) => ({
        name: beijingArea[id].name,
        value: [...beijingArea[id].value, count]
      }));
    },
    initCharts() {
      const charts = $echarts.init(this.$refs.visualDataMap);
      const option = {
        // 背景颜色
        backgroundColor: 'transparent',
        // 提示浮窗样式
        tooltip: {
          show: true,
          trigger: 'item',
          alwaysShowContent: false,
          backgroundColor: '#0C121C',
          borderColor: 'rgba(0, 0, 0, 0.16);',
          hideDelay: 100,
          triggerOn: 'mousemove',
          enterable: true,
          textStyle: {
            color: '#DADADA',
            fontSize: '12',
            width: 20,
            height: 30,
            overflow: 'break'
          },
          showDelay: 100
        },
        // 地图配置
        geo: {
          map: 'beijing',
          label: {
            // 通常状态下的样式
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            // 鼠标放上去的样式
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          // 地图区域的样式设置
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            // 鼠标放上去高亮的样式
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            legendHoverLink: true,
            symbolSize: [60, 60],
            // 这里渲染标志里的内容以及样式
            label: {
              show: true,
              formatter(value) {
                return value.data.value[2];
              },
              color: '#fff'
            },
            // 标志的样式
            itemStyle: {
              normal: {
                color: 'rgba(255,0,0,.7)',
                shadowBlur: 2,
                shadowColor: 'D8BC37'
              }
            },
            // 数据格式，其中name,value是必要的，value的前两个值是数据点的经纬度，其他的数据格式可以自定义
            // 至于如何展示，完全是靠上面的formatter来自己定义的
            data: [
              // { name: '西藏', value: [91.23, 29.5, 2333] },
            ],
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
          }
        ]
      };
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      $echarts.registerMap('beijing', beijing);
      option.series[0].data = this.handleMapData([
        { id: '110102', count: 1999 },
        { id: '110108', count: 1999 },
        { id: '110116', count: 2000000 }
      ]);
      charts.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.basic-map {
  width: 100%;
  height: 600px;
}
</style>
