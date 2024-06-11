export default [
  {
    title: '基础信息',
    path: '/baseData',
    children: [
      {
        title: '服务商',
        path: 'serviceProvider',
        children: [
          {
            title: '服务商信息',
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
            title: '服务商API',
            path: 'numApply',
          },
          {
            title: '服务商模板导出',
            path: 'supplierCredential',
          },

        ]
      },
      {
        title: '渠道管理',
        path: 'cEmsKind',
        children: [
          {
            title: '渠道列表',
            path: 'channel',
          },
          {
            title: '送达区域',
            path: 'setDeliveryArea',
          },
          {
            title: '城市邮编',
            path: 'setDeliveryCityZip',
          },
          {
            title: '偏远类别',
            path: 'setDeliveryAreaRemote',
          },
          {
            title: '偏远禁运',
            path: 'setRemoteProhibit',
            meta: {
              functionList: { 'setRemoteProhibit:exportGroup': '导出偏远禁运组' }
            }
          },
          {
            title: '参数规则',
            path: 'validateRules',
          },
          {
            title: '客户渠道白名单',
            path: 'customerWhiteList',
          },
          {
            title: '预录配额',
            path: 'preOrderQuota',
          },
          {
            title: '供应商渠道货量控制',
            path: 'supplierChannelVolumeControl',
          },
          {
            title: '渠道别名',
            path: 'channelAlias',
          },
        ]
      },
      {
        title: '路由配置',
        path: 'routerConfig',
        children: [
          {
            title: '预录单路由前置校验',
            path: 'preOrderRouterValidate',
            meta: {
              isNew: true,
            }
          },
          {
            title: '预录单路由',
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
            title: '预录单定制路由',
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
            title: '分拣路由',
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
            title: '分拣中心分拣路由',
            path: 'sortForwardRouter',
            meta: {
              isNew: true,
            }
          },
          {
            title: '分拣定制路由',
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
            title: '快手转单前提',
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
        title: '成本管理',
        path: 'costManage',
        children: [
          {
            title: '基础成本',
            path: 'setPriceCost',
          },
          {
            title: '定制地点成本',
            path: 'customizedCost',
          },
          {
            title: '定制分区成本',
            path: 'customizedAreaCost',
          },
          {
            title: '头程运输成本',
            path: 'headFreightCost',
          },
          {
            title: '定制地点头程运输成本',
            path: 'customizedHeadFreightCost',
          },
          {
            title: '定制分区头程运输成本',
            path: 'customizedAreaHeadFreightCost',
          },
          {
            title: '清关成本',
            path: 'customsClearanceCost',
          },
          {
            title: '定制地点清关成本',
            path: 'customizedClearanceCost',
          },
          {
            title: '定制分区清关成本',
            path: 'customizedAreaClearanceCost',
          },
          {
            title: '成本查询',
            path: 'cost',
          },
        ]
      },
      {
        title: '成本测算',
        path: 'costEstimates',
        children: [
          {
            title: '综合成本测算',
            path: 'costBudget',
          },
          {
            title: '成本配置',
            path: 'costConfig',
          },
          {
            title: '费用名称',
            path: 'costName',
          },
          {
            title: '预估方案配置',
            path: 'estimateConfig',
          },
        ]
      },
      {
        title: '重量规则',
        path: 'weightRule',
        children: [
          {
            title: '计泡规则',
            path: 'volumeWeightRule',
          },
          {
            title: '定制计泡规则',
            path: 'privateVolumeWeightRule',
          },
          {
            title: '计泡规则查询',
            path: 'volumeWeightRuleDetail',
          },
          {
            title: '试算计费重',
            path: 'calcChargeWeight',
          },
          {
            title: '计泡处理规则',
            path: 'volumeWeightRuleProcess',
          },
          {
            title: '定制计泡处理规则',
            path: 'privateVolumeWeightRuleCustom',
          },
        ]
      },
      {
        title: '报价管理',
        path: 'offerManage',
        children: [
          {
            title: '基础报价',
            path: 'setPrice',
          },
          {
            title: '站点报价',
            path: 'sitePrice',
          },
          {
            title: '特殊报价',
            path: 'specialPrice',
          },
          {
            title: '定制地点报价',
            path: 'customizedPrice',
          },
          {
            title: '定制分区报价',
            path: 'customizedAreaPrice',
          },
          {
            title: '计费组地点报价',
            path: 'chargingGroupPrice',
          },
          {
            title: '计费组分区报价',
            path: 'chargingGroupAreaPrice',
          },
          {
            title: '折扣管理',
            path: 'discountManagement',
          },
          {
            title: '报价查询',
            path: 'price',
            meta: {
              functionList: { 'price:updateQuote': '更新报价' }
            }
          },
          {
            title: '报价模拟',
            path: 'simulateQuotation',
          },
          {
            title: '报价模拟成本配置',
            path: 'costComparisonConfig',
          },
          {
            title: '同行报价配置',
            path: 'peerQuotationConfig',
          },
          {
            title: '销售预报',
            path: 'salesForecast',
            meta: {
              // isShow: true
            }
          },
          {
            title: '销售预报明细',
            path: 'salesForecastDetail',
            meta: {
              // isShow: true
            }
          },
        ]
      },
      {
        title: '号码管理',
        path: 'numberManage',
        children: [
          {
            title: '号码区间',
            path: 'numIntervalRule',
            meta: {
              functionList: { 'numIntervalRule:export': '导出' }
            }
          },
          {
            title: '号码池',
            path: 'numPool',
            meta: {
              functionList: { 'numPool:export': '导出' }
            }
          },
          {
            title: '号码分组',
            path: 'numGroup',
          },
          {
            title: '袋号规则',
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
            title: '内部袋号规则',
            path: 'bagNoAirportInner',
            meta: {
              functionList: {
                'bagNoAirportInner:edit': '编辑',
                'bagNoAirportInner:delete': '删除'
              }
            }
          },
          {
            title: '单号截取规则',
            path: 'cNoCutRule',
          },
        ]
      },

      {
        title: '审批管理',
        path: 'approvalManagement',
        meta: {
          // isShow: true
        },
        children: [
          {
            title: '审批组',
            path: 'approvalGroupManagement',
            meta: {
              // isShow: true
            },
          },
          {
            title: '审批规则',
            path: 'approvalRule',
            meta: {
              // isShow: true
            },
          },
          {
            title: '设置审批规则',
            path: 'approvalRule/addApprovalRule',
            meta: {
              isShow: true,
              isNotMenu: true
            }
          },
          {
            title: '全部审批单',
            path: 'allApprovals',
            meta: {
              // isShow: true
            },
          },
          {
            title: '我收到的审批',
            path: 'myApprovals',
            meta: {
              // isShow: true
            },
          },
          {
            title: '抄送给我的审批',
            path: 'notifierApprovals',
            meta: {
              // isShow: true
            },
          }
        ]
      },
      {
        title: '其他',
        path: 'baseOther',
        children: [
          {
            title: '标签管理',
            path: 'labelManage',
          },
          {
            title: '客户特殊分组',
            path: 'customerGroup',
          },
          {
            title: '合同管理',
            path: 'contractManager',
          },
          {
            title: '合同类型维护',
            path: 'contractTypeManage',
          },
          {
            title: 'PDA',
            path: 'PDA',
          },
          {
            title: '扫描事件',
            path: 'eventScanManage',
          },
          {
            title: '扫描事件日志',
            path: 'eventScanLog',
            meta: {
              functionList: {
                'eventScanLog:download': '导出',
                'eventScanLog:delete': '删除'
              }
            }
          },
          {
            title: '二级状态管理',
            path: 'secondStatusManage',
          },
          {
            title: '系统参数',
            path: 'sysParams',
          },
          {
            title: '扫描事件业务配置',
            path: 'eventScanBusinessConfig',
          },
        ]
      }
    ]
  },

  {
    title: '发货',
    path: '/ship',
    children: [
      {
        title: '代打包',
        path: 'insteadPacking',
        children: [
          {
            title: '转发数据录入',
            path: 'expressPackageDataRecord',
          },
          {
            title: '转发快件打包',
            path: 'expressPackage',
          },
          {
            title: '称重入库',
            path: 'warehousing',
          },
          {
            title: '打包打面单',
            path: 'packall',
            meta: {
              functionList: {
                'check': '核对',
                'packall:export': '导出',
              }
            },
          },
          {
            title: '已打包列表',
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
        title: '内部装袋操作',
        path: 'insidebagOperate',
        children: [
          {
            title: '内部装袋',
            path: 'insidebagging',
          },
          {
            title: '内部装袋新',
            path: 'insidebaggingNew',
          },
          {
            title: '已装袋列表',
            path: 'baglist',
          },
          {
            title: '装卸扫描',
            path: 'scanLoading',
          },
          {
            title: '内部追踪搜索',
            path: 'trackingSearch',
          },
          {
            title: '批量打印',
            path: 'bagnumpoint',
          },
        ]
      },
      {
        title: '客户预装袋操作',
        path: 'customerPreBagOperate',
        children: [
          {
            title: '预报重量',
            path: 'customerPreWeight',
          },
          {
            title: '客户预装袋',
            path: 'customerPreBagging',
          },
        ]
      },
      {
        title: '干线运输',
        path: 'trunkLine',
        children: [
          {
            title: '分部转运总单',
            path: 'branchTransportAWB',
          },
          {
            title: '转运管理',
            path: 'transportManagement',
          },
          {
            title: '线路管理',
            path: 'lineManage',
          },
          {
            title: '转运需求',
            path: 'transferManage',
            meta: {
              functionList: {
                'transferManage:add': '新增',
                'transferManage:edit': '编辑',
              }
            },
          },
          {
            title: '转运总单',
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
            title: '运输任务',
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
    title: '追踪',
    path: '/trackManager',
    children: [
      {
        title: '定时追踪',
        path: 'scheduledTrack',
        children: [
          {
            title: '渠道追踪配置',
            path: 'channelTrackConfig',
          },
          {
            title: '异常追踪管理',
            path: 'anomalyTrackOrder',
            meta: {
              functionList: { 'anomalyTrackOrder:export': '导出' }
            }
          },
          {
            title: '追踪关联标记管理',
            path: 'anomalyRelation',
          },
          {
            title: '追踪标签管理',
            path: 'anomalyLabelManagement',
          },
          {
            title: '任务日志',
            path: 'scheduleLog',
          },
        ]
      },
      {
        title: '追踪操作',
        path: 'trackOperate',
        children: [
          {
            title: '追踪导入',
            path: 'trackInfoImport',
          },
          {
            title: '总单追踪',
            path: 'AWBTrack',
            meta: {
              functionList: {
                'AWBTrack:trackViaMawbErrorExport': 'via清关追踪错误数据导出',
                'AWBTrack:mawbTrackViaMawb': 'via追踪主单导出'
              },
            }
          },
          {
            title: 'API追踪',
            path: 'lastmileEvent',
            meta: {
              functionList: { 'eventManage': '事件管理' }
            }
          },
        ]
      },
      {
        title: '追踪配置',
        path: 'trackConfig',
        children: [

          {
            title: '事件管理',
            path: 'eventManager',
          },
          {
            title: '地点管理',
            path: 'locationManager',
          },
          {
            title: '客户追踪信息屏蔽',
            path: 'informationShielding',
          },

          {
            title: '追踪标准事件',
            path: 'event',
          },
          {
            title: '轨迹标准化',
            path: 'eventMapping',
          },
          {
            title: '事件未映射监控',
            path: 'notConfiguredTrackLog',
          },
          {
            title: '追踪方式',
            path: 'trackCaller',
          },
          {
            title: '事件参数',
            path: 'sensitiveFields',
          },
          {
            title: '追踪可见性权限配置',
            path: 'trackVisableConfig',
          },
        ]
      },
      {
        title: '快件跟踪',
        path: 'expressTrack',
        children: [
          {
            title: '快件追踪',
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
            title: '末端派送分析',
            path: 'deliveryAnalysis',
          },
        ]
      }
    ]
  }

]