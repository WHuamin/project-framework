import AMap from 'AMap';
const MapInit = Object.freeze({
  zoomEnable: true, // 是否禁止缩放
  zoom: 14, // 缩放比例
  dragEnable: false, // 禁止拖动
  cursor: 'hand', // 鼠标在地图上的表现形式，小手
  resizeEnable: true, // 是否监控地图容器尺寸变化
  center: [113.307, 23.12], // 初始地图中心点坐标（广州）
  showIndoorMap: false, // 关闭室内地图

  isHotspot: true // 热点
});

const mapData = [
  {
    enterpriseName: '长沙南站',
    position: [113.06551, 28.147093]
  },
  {
    enterpriseName: '住处',
    position: [112.974214, 28.194504]
  },
  {
    enterpriseName: '岳麓山东门',
    position: [112.94867, 28.19393]
  },
  {
    enterpriseName: '岳麓山',
    position: [112.936154, 28.183605]
  },
  {
    enterpriseName: '岳麓书院',
    position: [112.940805, 28.180397]
  },
  {
    enterpriseName: '爱晚亭',
    position: [112.937564, 28.180437]
  },
  {
    enterpriseName: '橘子洲',
    position: [112.963081, 28.196505]
  },
  {
    enterpriseName: '李自健艺术馆',
    position: [112.949264, 28.118959]
  },
  {
    enterpriseName: '谢子龙影像艺术馆',
    position: [112.947121, 28.117792]
  },
  {
    enterpriseName: '万家丽天台停机坪',
    position: [112.986042, 28.068299]
  },
  {
    enterpriseName: '超级文和友',
    position: [112.970033, 28.189663]
  },
  {
    enterpriseName: 'IFS国金中心',
    position: [112.978733, 28.192437]
  },
  {
    enterpriseName: '恋爱天台',
    position: [112.975935, 28.187473]
  },
  {
    enterpriseName: '苏家巷',
    position: [112.978073, 28.189317]
  },
  {
    enterpriseName: '省博物馆',
    position: [112.993499, 28.211876]
  },
  {
    enterpriseName: '杜甫江阁',
    position: [112.968624, 28.184442]
  },
  {
    enterpriseName: '湖南大学',
    position: [112.945311, 28.178169]
  },
  {
    enterpriseName: '湖南电视台',
    position: [113.000577, 28.215688]
  },
  {
    enterpriseName: '南门口',
    position: [112.973827, 28.182636]
  }
];
export default class GDMap {
  constructor(wrapperId, mapConfig, config) {
    this.map = this._initMap(wrapperId, mapConfig);
    this.markers = [];
    this.mapCity = '广州';
    this.placeSearch = undefined;

    // 地图加载完成
    this.map.on('complete', () => {
      console.log('地图加载完成');

      // 输入提示
      if (config?.inputPromptId) {
        const auto = new AMap.Autocomplete({
          input: config.inputPromptId
        });
        this._initPlaceSearch();
        console.log('输入提示', auto);
      }
      // 地图基本插件
      if (config?.plugin?.length) {
        this._loadPlugin(config.plugin);
      }
      this.addMarker(mapData);
    });
  }

  // 函数前面带有下划线的 表示内部调用
  _initMap(id, mapConfig = {}) {
    return new AMap.Map(id, { ...MapInit, ...mapConfig });
  }

  _initPlaceSearch() {
    AMap.plugin('AMap.PlaceSearch', () => {
      this.placeSearch = new AMap.PlaceSearch({
        city: this.mapCity
      }); // 构造地点查询类
    });
  }

  // 获取搜索信息
  getSearchWordsData(keywords) {
    this.placeSearch.search(keywords, (status, result) => {
      // 搜索成功时，result即是对应的匹配数据
      console.log('搜索成功', result);
    });
  }

  /**
   * 加载插件
   * @param {Array} plugin 插件名称
   */
  _loadPlugin(plugin) {
    if (!plugin) return false;
    // 加载单个插件
    // map.plugin('AMap.ToolBar', function () {
    //   map.addControl(new AMap.ToolBar());
    // });

    // 加载多个插件 ['AMap.ToolBar', 'AMap.Driving']
    this.map.plugin(
      plugin.map((item) => `AMap.${item}`),
      () => {
        plugin.forEach((item) => {
          switch (item) {
            case 'ToolBar':
            case 'Scale':
              this.map.addControl(new AMap[item]());
              break;
            case 'OverView':
              this.map.addControl(new AMap[item]({ isOpen: true }));
              break;
          }
        });
        this.map.clearMap(); // 清除所有的覆盖物信息
      }
    );
  }

  /**
   * 设置中心
   * @param {*} lng 经度范围
   * @param {*} lat 纬度范围
   */
  setMapCenter(lng, lat) {
    this.map && this.map.setCenter([lng, lat]); // 设置地图中心点
  }

  // 构造点标记
  _createMarker(data) {
    return new AMap.Marker({
      // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: data.position,
      offset: new AMap.Pixel(-13, -30),
      title: data.enterpriseName
    });
  }

  addMarker(list) {
    const markers = [];
    for (const i in list) {
      const marker = this._createMarker(list[i]);
      markers.push(marker);
    }
    this.map.add(markers);
    // 自动适配到指定视野范围  //无参数时，自动自适应所有覆盖物
    this.map.setFitView();
    // this.map.setFitView([marker]);
  }

  removeMarker(position) {
    this.map.remove(this._createMarker(position));
    this.map.setFitView();
  }

  // 销毁地图
  destroyMap() {
    this.map && this.map.destroy();
  }
}
