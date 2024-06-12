export default [
  {
    name: '基础信息',
    path: '/baseData',
    children: [
      {
        name: '服务商',
        path: 'serviceProvider',
        children: [
          {
            name: '服务商信息',
            path: 'supplyInfo',
            meta: {
              functionList: {
                'updateBookingAgentFlight': '航司配置成本',
                'supplyInfo:add': '新增',
                'supplyInfo:edit': '编辑',
                'supplyInfo:delete': '删除'
              }
            },
          },
          {
            name: '服务商API',
            path: 'numApply',
          },
          {
            name: '服务商模板导出',
            path: 'supplierCredential',
          },

        ]
      },
      {
        name: '渠道管理',
        path: 'cEmsKind',
        children: [
          {
            name: '渠道列表',
            path: 'channel',
          },
          {
            name: '送达区域',
            path: 'setDeliveryArea',
          },
          {
            name: '城市邮编',
            path: 'setDeliveryCityZip',
          },
          {
            name: '偏远类别',
            path: 'setDeliveryAreaRemote',
          },
          {
            name: '偏远禁运',
            path: 'setRemoteProhibit',
            meta: {
              functionList: { 'setRemoteProhibit:exportGroup': '导出偏远禁运组' }
            }
          },
          {
            name: '参数规则',
            path: 'validateRules',
          },
          {
            name: '客户渠道白名单',
            path: 'customerWhiteList',
          },
          {
            name: '预录配额',
            path: 'preOrderQuota',
          },
          {
            name: '供应商渠道货量控制',
            path: 'supplierChannelVolumeControl',
          },
          {
            name: '渠道别名',
            path: 'channelAlias',
          },
        ]
      },
      {
        name: '路由配置',
        path: 'routerConfig',
        children: [
          {
            name: '预录单路由前置校验',
            path: 'preOrderRouterValidate',
            meta: {
              isNew: true,
            }
          },
          {
            name: '预录单路由',
            path: 'preOrderRouter',
            meta: {
              functionList: {
                'preOrderRouter:seeDelete': '删除日志',
                'preOrderRouter:seeUpdate': '新增/更新日志',
                'preOrderRouter:add': '新增',
                'preOrderRouter:edit': '编辑',
                'preOrderRouter:delete': '删除',
                'preOrderRouter:sort': '排序',
                'preOrderRouter:import': '导入',
              }
            }
          },
          {
            name: '预录单定制路由',
            path: 'customRoutePreOrder',
            meta: {
              functionList: {
                'customRoutePreOrder:seeDelete': '删除日志',
                'customRoutePreOrder:seeUpdate': '新增/更新日志',
                'customRoutePreOrder:add': '新增',
                'customRoutePreOrder:edit': '编辑',
                'customRoutePreOrder:delete': '删除',
              }
            }
          },
          {
            name: '分拣路由',
            path: 'forwardRouter',
            meta: {
              functionList: {
                'forwardRouter:seeDelete': '删除日志',
                'forwardRouter:seeUpdate': '新增/更新日志',
                'forwardRouter:add': '新增',
                'forwardRouter:edit': '编辑',
                'forwardRouter:delete': '删除',
                'forwardRouter:sort': '排序',
                'forwardRouter:import': '导入',
              }
            }
          },
          {
            name: '分拣中心分拣路由',
            path: 'sortForwardRouter',
            meta: {
              isNew: true,
            }
          },
          {
            name: '分拣定制路由',
            path: 'customRouteForward',
            meta: {
              functionList: {
                'customRouteForward:seeDelete': '删除日志',
                'customRouteForward:seeUpdate': '新增/更新日志',
                'customRouteForward:add': '新增',
                'customRouteForward:edit': '编辑',
                'customRouteForward:delete': '删除',
              }
            }
          },
          {
            name: '快手转单前提',
            path: 'shouldRelabel',
            meta: {
              functionList: {
                'shouldRelabel:seeUpdate': '新增/更新日志',
                'shouldRelabel:add': '新增',
                'shouldRelabel:edit': '编辑',
                'shouldRelabel:delete': '删除',
                'shouldRelabel:sort': '配置校验',
              },
            }
          },
        ]
      },
      {
        name: '成本管理',
        path: 'costManage',
        children: [
          {
            name: '基础成本',
            path: 'setPriceCost',
          },
          {
            name: '定制地点成本',
            path: 'customizedCost',
          },
          {
            name: '定制分区成本',
            path: 'customizedAreaCost',
          },
          {
            name: '头程运输成本',
            path: 'headFreightCost',
          },
          {
            name: '定制地点头程运输成本',
            path: 'customizedHeadFreightCost',
          },
          {
            name: '定制分区头程运输成本',
            path: 'customizedAreaHeadFreightCost',
          },
          {
            name: '清关成本',
            path: 'customsClearanceCost',
          },
          {
            name: '定制地点清关成本',
            path: 'customizedClearanceCost',
          },
          {
            name: '定制分区清关成本',
            path: 'customizedAreaClearanceCost',
          },
          {
            name: '成本查询',
            path: 'cost',
          },
        ]
      },
      {
        name: '成本测算',
        path: 'costEstimates',
        children: [
          {
            name: '综合成本测算',
            path: 'costBudget',
          },
          {
            name: '成本配置',
            path: 'costConfig',
          },
          {
            name: '费用名称',
            path: 'costName',
          },
          {
            name: '预估方案配置',
            path: 'estimateConfig',
          },
        ]
      },
      {
        name: '重量规则',
        path: 'weightRule',
        children: [
          {
            name: '计泡规则',
            path: 'volumeWeightRule',
          },
          {
            name: '定制计泡规则',
            path: 'privateVolumeWeightRule',
          },
          {
            name: '计泡规则查询',
            path: 'volumeWeightRuleDetail',
          },
          {
            name: '试算计费重',
            path: 'calcChargeWeight',
          },
          {
            name: '计泡处理规则',
            path: 'volumeWeightRuleProcess',
          },
          {
            name: '定制计泡处理规则',
            path: 'privateVolumeWeightRuleCustom',
          },
        ]
      },
      {
        name: '报价管理',
        path: 'offerManage',
        children: [
          {
            name: '基础报价',
            path: 'setPrice',
          },
          {
            name: '站点报价',
            path: 'sitePrice',
          },
          {
            name: '特殊报价',
            path: 'specialPrice',
          },
          {
            name: '定制地点报价',
            path: 'customizedPrice',
          },
          {
            name: '定制分区报价',
            path: 'customizedAreaPrice',
          },
          {
            name: '计费组地点报价',
            path: 'chargingGroupPrice',
          },
          {
            name: '计费组分区报价',
            path: 'chargingGroupAreaPrice',
          },
          {
            name: '折扣管理',
            path: 'discountManagement',
          },
          {
            name: '报价查询',
            path: 'price',
            meta: {
              functionList: { 'price:updateQuote': '更新报价' }
            }
          },
          {
            name: '报价模拟',
            path: 'simulateQuotation',
          },
          {
            name: '报价模拟成本配置',
            path: 'costComparisonConfig',
          },
          {
            name: '同行报价配置',
            path: 'peerQuotationConfig',
          },
          {
            name: '销售预报',
            path: 'salesForecast',
            meta: {
              // isShow: true
            }
          },
          {
            name: '销售预报明细',
            path: 'salesForecastDetail',
            meta: {
              // isShow: true
            }
          },
        ]
      },
      {
        name: '号码管理',
        path: 'numberManage',
        children: [
          {
            name: '号码区间',
            path: 'numIntervalRule',
            meta: {
              functionList: { 'numIntervalRule:export': '导出' }
            }
          },
          {
            name: '号码池',
            path: 'numPool',
            meta: {
              functionList: { 'numPool:export': '导出' }
            }
          },
          {
            name: '号码分组',
            path: 'numGroup',
          },
          {
            name: '袋号规则',
            path: 'bagNoAirport',
            meta: {
              functionList: {
                'bagNoAirport:edit': '编辑',
                'bagNoAirport:bind': '绑定',
                'bagNoAirport:delete': '删除'
              }
            }
          },
          {
            name: '内部袋号规则',
            path: 'bagNoAirportInner',
            meta: {
              functionList: {
                'bagNoAirportInner:edit': '编辑',
                'bagNoAirportInner:delete': '删除'
              }
            }
          },
          {
            name: '单号截取规则',
            path: 'cNoCutRule',
          },
        ]
      },

      {
        name: '审批管理',
        path: 'approvalManagement',
        meta: {
          // isShow: true
        },
        children: [
          {
            name: '审批组',
            path: 'approvalGroupManagement',
            meta: {
              // isShow: true
            },
          },
          {
            name: '审批规则',
            path: 'approvalRule',
            meta: {
              // isShow: true
            },
          },
          {
            name: '设置审批规则',
            path: 'approvalRule/addApprovalRule',
            meta: {
              isShow: true,
              isNotMenu: true
            }
          },
          {
            name: '全部审批单',
            path: 'allApprovals',
            meta: {
              // isShow: true
            },
          },
          {
            name: '我收到的审批',
            path: 'myApprovals',
            meta: {
              // isShow: true
            },
          },
          {
            name: '抄送给我的审批',
            path: 'notifierApprovals',
            meta: {
              // isShow: true
            },
          }
        ]
      },
      {
        name: '其他',
        path: 'baseOther',
        children: [
          {
            name: '标签管理',
            path: 'labelManage',
          },
          {
            name: '客户特殊分组',
            path: 'customerGroup',
          },
          {
            name: '合同管理',
            path: 'contractManager',
          },
          {
            name: '合同类型维护',
            path: 'contractTypeManage',
          },
          {
            name: 'PDA',
            path: 'PDA',
          },
          {
            name: '扫描事件',
            path: 'eventScanManage',
          },
          {
            name: '扫描事件日志',
            path: 'eventScanLog',
            meta: {
              functionList: {
                'eventScanLog:download': '导出',
                'eventScanLog:delete': '删除'
              }
            }
          },
          {
            name: '二级状态管理',
            path: 'secondStatusManage',
          },
          {
            name: '系统参数',
            path: 'sysParams',
          },
          {
            name: '扫描事件业务配置',
            path: 'eventScanBusinessConfig',
          },
        ]
      }
    ]
  },

  {
    name: '发货',
    path: '/ship',
    children: [
      {
        name: '代打包',
        path: 'insteadPacking',
        children: [
          {
            name: '转发数据录入',
            path: 'expressPackageDataRecord',
          },
          {
            name: '转发快件打包',
            path: 'expressPackage',
          },
          {
            name: '称重入库',
            path: 'warehousing',
          },
          {
            name: '打包打面单',
            path: 'packall',
            meta: {
              functionList: {
                'check': '核对',
                'packall:export': '导出',
              }
            },
          },
          {
            name: '已打包列表',
            path: 'packlist',
            meta: {
              functionList: {
                'packlist:export': '导出',
              }
            },
          },
        ]
      },
      {
        name: '内部装袋操作',
        path: 'insidebagOperate',
        children: [
          {
            name: '内部装袋',
            path: 'insidebagging',
          },
          {
            name: '内部装袋新',
            path: 'insidebaggingNew',
          },
          {
            name: '已装袋列表',
            path: 'baglist',
          },
          {
            name: '装卸扫描',
            path: 'scanLoading',
          },
          {
            name: '内部追踪搜索',
            path: 'trackingSearch',
          },
          {
            name: '批量打印',
            path: 'bagnumpoint',
          },
        ]
      },
      {
        name: '客户预装袋操作',
        path: 'customerPreBagOperate',
        children: [
          {
            name: '预报重量',
            path: 'customerPreWeight',
          },
          {
            name: '客户预装袋',
            path: 'customerPreBagging',
          },
        ]
      },
      {
        name: '干线运输',
        path: 'trunkLine',
        children: [
          {
            name: '分部转运总单',
            path: 'branchTransportAWB',
          },
          {
            name: '转运管理',
            path: 'transportManagement',
          },
          {
            name: '线路管理',
            path: 'lineManage',
          },
          {
            name: '转运需求',
            path: 'transferManage',
            meta: {
              functionList: {
                'transferManage:add': '新增',
                'transferManage:edit': '编辑',
              }
            },
          },
          {
            name: '转运总单',
            path: 'transferMawb',
            meta: {
              functionList: {
                'transferMawb:add': '新增',
                'transferMawb:delete': '删除',
                'transferMawb:export': '导出',
              }
            },
          },
          {
            name: '运输任务',
            path: 'transferRecord',
            meta: {
              functionList: {
                'transferRecord:add': '新增',
                'transferRecord:delete': '删除',
                'transferRecord:edit': '编辑',
              }
            },
          },

        ]
      },

    ]
  },
  {
    name: '追踪',
    path: '/trackManager',
    children: [
      {
        name: '定时追踪',
        path: 'scheduledTrack',
        children: [
          {
            name: '渠道追踪配置',
            path: 'channelTrackConfig',
          },
          {
            name: '异常追踪管理',
            path: 'anomalyTrackOrder',
            meta: {
              functionList: { 'anomalyTrackOrder:export': '导出' }
            }
          },
          {
            name: '追踪关联标记管理',
            path: 'anomalyRelation',
          },
          {
            name: '追踪标签管理',
            path: 'anomalyLabelManagement',
          },
          {
            name: '任务日志',
            path: 'scheduleLog',
          },
        ]
      },
      {
        name: '追踪操作',
        path: 'trackOperate',
        children: [
          {
            name: '追踪导入',
            path: 'trackInfoImport',
          },
          {
            name: '总单追踪',
            path: 'AWBTrack',
            meta: {
              functionList: {
                'AWBTrack:trackViaMawbErrorExport': 'via清关追踪错误数据导出',
                'AWBTrack:mawbTrackViaMawb': 'via追踪主单导出'
              },
            }
          },
          {
            name: 'API追踪',
            path: 'lastmileEvent',
            meta: {
              functionList: { 'eventManage': '事件管理' }
            }
          },
        ]
      },
      {
        name: '追踪配置',
        path: 'trackConfig',
        children: [

          {
            name: '事件管理',
            path: 'eventManager',
          },
          {
            name: '地点管理',
            path: 'locationManager',
          },
          {
            name: '客户追踪信息屏蔽',
            path: 'informationShielding',
          },

          {
            name: '追踪标准事件',
            path: 'event',
          },
          {
            name: '轨迹标准化',
            path: 'eventMapping',
          },
          {
            name: '事件未映射监控',
            path: 'notConfiguredTrackLog',
          },
          {
            name: '追踪方式',
            path: 'trackCaller',
          },
          {
            name: '事件参数',
            path: 'sensitiveFields',
          },
          {
            name: '追踪可见性权限配置',
            path: 'trackVisableConfig',
          },
        ]
      },
      {
        name: '快件跟踪',
        path: 'expressTrack',
        children: [
          {
            name: '快件追踪',
            path: 'expressTrackingNew',
            meta: {
              functionList: {
                'expressTrackingNew:importBtn': '导出',
                'expressTrackingNew:lastPortExport': '末端追踪导出',
                'expressTrackingNew:track': '追踪',
                'expressTrackingNew:customerExport': '大客户追踪导出',
                'expressTrackingNew:checkCustomer': '查看客户（基础信息）',
                'expressTrackingNew:orderNums': '批量个数',
              },
            },
          },
          {
            name: '末端派送分析',
            path: 'deliveryAnalysis',
          },
        ]
      }
    ]
  }

]