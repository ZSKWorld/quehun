declare interface ITable_Activity {
	activity: ISheet_Activity_Activity;
	task: ISheet_Activity_Task;
	exchange: ISheet_Activity_Exchange;
	chest_up: ISheet_Activity_ChestUp;
	game_task: ISheet_Activity_GameTask;
	game_point: ISheet_Activity_GamePoint;
	rank: ISheet_Activity_Rank;
	rank_reward: ISheet_Activity_RankReward;
	flip_task: ISheet_Activity_FlipTask;
	flip_info: ISheet_Activity_FlipInfo;
	daily_sign: ISheet_Activity_DailySign;
	richman_info: ISheet_Activity_RichmanInfo;
	richman_map: ISheet_Activity_RichmanMap;
	richman_level: ISheet_Activity_RichmanLevel;
	richman_event: ISheet_Activity_RichmanEvent;
	period_task: ISheet_Activity_PeriodTask;
	random_task_pool: ISheet_Activity_RandomTaskPool;
	random_task_info: ISheet_Activity_RandomTaskInfo;
	richman_reward_seq: ISheet_Activity_RichmanRewardSeq;
	activity_buff: ISheet_Activity_ActivityBuff;
	buff_condition: ISheet_Activity_BuffCondition;
	game_point_info: ISheet_Activity_GamePointInfo;
	game_point_rank: ISheet_Activity_GamePointRank;
	game_point_filter: ISheet_Activity_GamePointFilter;
	activity_room: ISheet_Activity_ActivityRoom;
	sns_activity: ISheet_Activity_SnsActivity;
	mine_activity: ISheet_Activity_MineActivity;
	mine_reward: ISheet_Activity_MineReward;
	rpg_activity: ISheet_Activity_RpgActivity;
	rpg_monster_group: ISheet_Activity_RpgMonsterGroup;
	arena_activity: ISheet_Activity_ArenaActivity;
	arena_reward: ISheet_Activity_ArenaReward;
	arena_reward_display: ISheet_Activity_ArenaRewardDisplay;
	segment_task: ISheet_Activity_SegmentTask;
	feed_activity_info: ISheet_Activity_FeedActivityInfo;
	feed_activity_reward: ISheet_Activity_FeedActivityReward;
	vote_activity: ISheet_Activity_VoteActivity;
	rpg_v2_activity: ISheet_Activity_RpgV2Activity;
	spot_activity: ISheet_Activity_SpotActivity;
	activity_item: ISheet_Activity_ActivityItem;
	upgrade_activity: ISheet_Activity_UpgradeActivity;
	upgrade_activity_reward: ISheet_Activity_UpgradeActivityReward;
	friend_gift_activity: ISheet_Activity_FriendGiftActivity;
	upgrade_activity_display: ISheet_Activity_UpgradeActivityDisplay;
	activity_desktop: ISheet_Activity_ActivityDesktop;
	gacha_activity_info: ISheet_Activity_GachaActivityInfo;
	gacha_pool: ISheet_Activity_GachaPool;
	gacha_control: ISheet_Activity_GachaControl;
	task_display: ISheet_Activity_TaskDisplay;
	simulation_activity_info: ISheet_Activity_SimulationActivityInfo;
	reward_mail: ISheet_Activity_RewardMail;
	combining_activity_info: ISheet_Activity_CombiningActivityInfo;
	combining_craft_pool: ISheet_Activity_CombiningCraftPool;
	combining_map: ISheet_Activity_CombiningMap;
	combining_order: ISheet_Activity_CombiningOrder;
	combining_craft: ISheet_Activity_CombiningCraft;
	combining_customer: ISheet_Activity_CombiningCustomer;
	chest_replace_up: ISheet_Activity_ChestReplaceUp;
	village_activity_info: ISheet_Activity_VillageActivityInfo;
	village_building: ISheet_Activity_VillageBuilding;
	village_task: ISheet_Activity_VillageTask;
	liver_event_info: ISheet_Activity_LiverEventInfo;
	liver_text_info: ISheet_Activity_LiverTextInfo;
	festival_activity: ISheet_Activity_FestivalActivity;
	festival_level: ISheet_Activity_FestivalLevel;
	festival_proposal: ISheet_Activity_FestivalProposal;
	festival_event: ISheet_Activity_FestivalEvent;
	festival_ending: ISheet_Activity_FestivalEnding;
	island_activity: ISheet_Activity_IslandActivity;
	island_goods: ISheet_Activity_IslandGoods;
	island_bag: ISheet_Activity_IslandBag;
	island_map: ISheet_Activity_IslandMap;
	island_shop: ISheet_Activity_IslandShop;
	island_news: ISheet_Activity_IslandNews;
	summer_story: ISheet_Activity_SummerStory;
	story_activity: ISheet_Activity_StoryActivity;
	story_ending: ISheet_Activity_StoryEnding;
	activity_banner: ISheet_Activity_ActivityBanner;
	activity_guide: ISheet_Activity_ActivityGuide;
	summer_story_reward: ISheet_Activity_SummerStoryReward;
	choose_up_activity: ISheet_Activity_ChooseUpActivity;
	choose_up_replace: ISheet_Activity_ChooseUpReplace;
	progress_reward: ISheet_Activity_ProgressReward;
}

//#region activity --- unique
declare interface ISheet_Activity_Activity {
	rows: ISheetData_Activity_Activity[];
	1001: ISheetData_Activity_Activity;
	1002: ISheetData_Activity_Activity;
	1003: ISheetData_Activity_Activity;
	1004: ISheetData_Activity_Activity;
	1005: ISheetData_Activity_Activity;
	1006: ISheetData_Activity_Activity;
	1007: ISheetData_Activity_Activity;
	1008: ISheetData_Activity_Activity;
	1009: ISheetData_Activity_Activity;
	1010: ISheetData_Activity_Activity;
	1011: ISheetData_Activity_Activity;
	1012: ISheetData_Activity_Activity;
	1013: ISheetData_Activity_Activity;
	1014: ISheetData_Activity_Activity;
	1015: ISheetData_Activity_Activity;
	1016: ISheetData_Activity_Activity;
	1017: ISheetData_Activity_Activity;
	1018: ISheetData_Activity_Activity;
	1019: ISheetData_Activity_Activity;
	1022: ISheetData_Activity_Activity;
	1023: ISheetData_Activity_Activity;
	1024: ISheetData_Activity_Activity;
	1025: ISheetData_Activity_Activity;
	1026: ISheetData_Activity_Activity;
	1027: ISheetData_Activity_Activity;
	1028: ISheetData_Activity_Activity;
	1029: ISheetData_Activity_Activity;
	1030: ISheetData_Activity_Activity;
	1031: ISheetData_Activity_Activity;
	1032: ISheetData_Activity_Activity;
	1033: ISheetData_Activity_Activity;
	1034: ISheetData_Activity_Activity;
	1035: ISheetData_Activity_Activity;
	1036: ISheetData_Activity_Activity;
	1037: ISheetData_Activity_Activity;
	1038: ISheetData_Activity_Activity;
	1039: ISheetData_Activity_Activity;
	1040: ISheetData_Activity_Activity;
	1041: ISheetData_Activity_Activity;
	1042: ISheetData_Activity_Activity;
	1043: ISheetData_Activity_Activity;
	1044: ISheetData_Activity_Activity;
	1045: ISheetData_Activity_Activity;
	1046: ISheetData_Activity_Activity;
	1047: ISheetData_Activity_Activity;
	1048: ISheetData_Activity_Activity;
	1049: ISheetData_Activity_Activity;
	1050: ISheetData_Activity_Activity;
	1051: ISheetData_Activity_Activity;
	1052: ISheetData_Activity_Activity;
	1053: ISheetData_Activity_Activity;
	1054: ISheetData_Activity_Activity;
	1055: ISheetData_Activity_Activity;
	1056: ISheetData_Activity_Activity;
	1057: ISheetData_Activity_Activity;
	1058: ISheetData_Activity_Activity;
	1062: ISheetData_Activity_Activity;
	1063: ISheetData_Activity_Activity;
	1064: ISheetData_Activity_Activity;
	1065: ISheetData_Activity_Activity;
	1066: ISheetData_Activity_Activity;
	1068: ISheetData_Activity_Activity;
	1069: ISheetData_Activity_Activity;
	1070: ISheetData_Activity_Activity;
	1071: ISheetData_Activity_Activity;
	1072: ISheetData_Activity_Activity;
	1073: ISheetData_Activity_Activity;
	1074: ISheetData_Activity_Activity;
	1075: ISheetData_Activity_Activity;
	1076: ISheetData_Activity_Activity;
	1077: ISheetData_Activity_Activity;
	1078: ISheetData_Activity_Activity;
	1080: ISheetData_Activity_Activity;
	1081: ISheetData_Activity_Activity;
	1082: ISheetData_Activity_Activity;
	1083: ISheetData_Activity_Activity;
	1084: ISheetData_Activity_Activity;
	1085: ISheetData_Activity_Activity;
	1086: ISheetData_Activity_Activity;
	1087: ISheetData_Activity_Activity;
	1088: ISheetData_Activity_Activity;
	1089: ISheetData_Activity_Activity;
	1090: ISheetData_Activity_Activity;
	1091: ISheetData_Activity_Activity;
	1092: ISheetData_Activity_Activity;
	1093: ISheetData_Activity_Activity;
	1094: ISheetData_Activity_Activity;
	1095: ISheetData_Activity_Activity;
	1096: ISheetData_Activity_Activity;
	1097: ISheetData_Activity_Activity;
	1098: ISheetData_Activity_Activity;
	1099: ISheetData_Activity_Activity;
	1100: ISheetData_Activity_Activity;
	1101: ISheetData_Activity_Activity;
	1102: ISheetData_Activity_Activity;
	1104: ISheetData_Activity_Activity;
	1106: ISheetData_Activity_Activity;
	1107: ISheetData_Activity_Activity;
	1108: ISheetData_Activity_Activity;
	1109: ISheetData_Activity_Activity;
	1110: ISheetData_Activity_Activity;
	1111: ISheetData_Activity_Activity;
	1112: ISheetData_Activity_Activity;
	1113: ISheetData_Activity_Activity;
	1114: ISheetData_Activity_Activity;
	1115: ISheetData_Activity_Activity;
	1116: ISheetData_Activity_Activity;
	1117: ISheetData_Activity_Activity;
	1118: ISheetData_Activity_Activity;
	1119: ISheetData_Activity_Activity;
	1120: ISheetData_Activity_Activity;
	1121: ISheetData_Activity_Activity;
	1122: ISheetData_Activity_Activity;
	1123: ISheetData_Activity_Activity;
	1124: ISheetData_Activity_Activity;
	1125: ISheetData_Activity_Activity;
	1126: ISheetData_Activity_Activity;
	1127: ISheetData_Activity_Activity;
	1128: ISheetData_Activity_Activity;
	1129: ISheetData_Activity_Activity;
	1130: ISheetData_Activity_Activity;
	1131: ISheetData_Activity_Activity;
	1132: ISheetData_Activity_Activity;
	1133: ISheetData_Activity_Activity;
	1134: ISheetData_Activity_Activity;
	1135: ISheetData_Activity_Activity;
	1136: ISheetData_Activity_Activity;
	1137: ISheetData_Activity_Activity;
	1138: ISheetData_Activity_Activity;
	1139: ISheetData_Activity_Activity;
	1140: ISheetData_Activity_Activity;
	1141: ISheetData_Activity_Activity;
	1142: ISheetData_Activity_Activity;
	1143: ISheetData_Activity_Activity;
	1144: ISheetData_Activity_Activity;
	1145: ISheetData_Activity_Activity;
	1146: ISheetData_Activity_Activity;
	1147: ISheetData_Activity_Activity;
	1148: ISheetData_Activity_Activity;
	1149: ISheetData_Activity_Activity;
	1150: ISheetData_Activity_Activity;
	1151: ISheetData_Activity_Activity;
	1152: ISheetData_Activity_Activity;
	1153: ISheetData_Activity_Activity;
	1154: ISheetData_Activity_Activity;
	1155: ISheetData_Activity_Activity;
	1156: ISheetData_Activity_Activity;
	1157: ISheetData_Activity_Activity;
	1158: ISheetData_Activity_Activity;
	1159: ISheetData_Activity_Activity;
	1160: ISheetData_Activity_Activity;
	1161: ISheetData_Activity_Activity;
	1162: ISheetData_Activity_Activity;
	1163: ISheetData_Activity_Activity;
	1164: ISheetData_Activity_Activity;
	1165: ISheetData_Activity_Activity;
	1166: ISheetData_Activity_Activity;
	1167: ISheetData_Activity_Activity;
	1168: ISheetData_Activity_Activity;
	1169: ISheetData_Activity_Activity;
	1170: ISheetData_Activity_Activity;
	1171: ISheetData_Activity_Activity;
	1172: ISheetData_Activity_Activity;
	1173: ISheetData_Activity_Activity;
	1174: ISheetData_Activity_Activity;
	1175: ISheetData_Activity_Activity;
	1176: ISheetData_Activity_Activity;
	1177: ISheetData_Activity_Activity;
	1178: ISheetData_Activity_Activity;
	1179: ISheetData_Activity_Activity;
	1180: ISheetData_Activity_Activity;
	1181: ISheetData_Activity_Activity;
	1182: ISheetData_Activity_Activity;
	1183: ISheetData_Activity_Activity;
	1184: ISheetData_Activity_Activity;
	1185: ISheetData_Activity_Activity;
	1186: ISheetData_Activity_Activity;
	1187: ISheetData_Activity_Activity;
	1188: ISheetData_Activity_Activity;
	1189: ISheetData_Activity_Activity;
	1190: ISheetData_Activity_Activity;
	1191: ISheetData_Activity_Activity;
	1192: ISheetData_Activity_Activity;
	1193: ISheetData_Activity_Activity;
	1194: ISheetData_Activity_Activity;
	1195: ISheetData_Activity_Activity;
	1196: ISheetData_Activity_Activity;
	1197: ISheetData_Activity_Activity;
	1198: ISheetData_Activity_Activity;
	1199: ISheetData_Activity_Activity;
	1200: ISheetData_Activity_Activity;
	1201: ISheetData_Activity_Activity;
	1202: ISheetData_Activity_Activity;
	1203: ISheetData_Activity_Activity;
	1204: ISheetData_Activity_Activity;
	1205: ISheetData_Activity_Activity;
	1206: ISheetData_Activity_Activity;
	1208: ISheetData_Activity_Activity;
	1209: ISheetData_Activity_Activity;
	1210: ISheetData_Activity_Activity;
	1211: ISheetData_Activity_Activity;
	1212: ISheetData_Activity_Activity;
	1214: ISheetData_Activity_Activity;
	1215: ISheetData_Activity_Activity;
	1216: ISheetData_Activity_Activity;
	1217: ISheetData_Activity_Activity;
	1218: ISheetData_Activity_Activity;
	1219: ISheetData_Activity_Activity;
	1220: ISheetData_Activity_Activity;
	1221: ISheetData_Activity_Activity;
	1222: ISheetData_Activity_Activity;
	1223: ISheetData_Activity_Activity;
	1224: ISheetData_Activity_Activity;
	1225: ISheetData_Activity_Activity;
	1226: ISheetData_Activity_Activity;
	1227: ISheetData_Activity_Activity;
	1228: ISheetData_Activity_Activity;
	1229: ISheetData_Activity_Activity;
	1230: ISheetData_Activity_Activity;
	1231: ISheetData_Activity_Activity;
	1232: ISheetData_Activity_Activity;
	1233: ISheetData_Activity_Activity;
	1234: ISheetData_Activity_Activity;
	1235: ISheetData_Activity_Activity;
	1236: ISheetData_Activity_Activity;
	1237: ISheetData_Activity_Activity;
	1238: ISheetData_Activity_Activity;
	1239: ISheetData_Activity_Activity;
	1240: ISheetData_Activity_Activity;
	1241: ISheetData_Activity_Activity;
	1242: ISheetData_Activity_Activity;
	1243: ISheetData_Activity_Activity;
	1244: ISheetData_Activity_Activity;
	1245: ISheetData_Activity_Activity;
	1246: ISheetData_Activity_Activity;
	1247: ISheetData_Activity_Activity;
	1248: ISheetData_Activity_Activity;
	1249: ISheetData_Activity_Activity;
	1250: ISheetData_Activity_Activity;
	1251: ISheetData_Activity_Activity;
	1252: ISheetData_Activity_Activity;
	1253: ISheetData_Activity_Activity;
	1254: ISheetData_Activity_Activity;
	1255: ISheetData_Activity_Activity;
	1256: ISheetData_Activity_Activity;
	1257: ISheetData_Activity_Activity;
	1258: ISheetData_Activity_Activity;
	1259: ISheetData_Activity_Activity;
	1260: ISheetData_Activity_Activity;
	1261: ISheetData_Activity_Activity;
	1262: ISheetData_Activity_Activity;
	1263: ISheetData_Activity_Activity;
	1264: ISheetData_Activity_Activity;
	1265: ISheetData_Activity_Activity;
	1266: ISheetData_Activity_Activity;
	1267: ISheetData_Activity_Activity;
	1268: ISheetData_Activity_Activity;
	1269: ISheetData_Activity_Activity;
	1270: ISheetData_Activity_Activity;
	1271: ISheetData_Activity_Activity;
	1272: ISheetData_Activity_Activity;
	1273: ISheetData_Activity_Activity;
	1274: ISheetData_Activity_Activity;
	1275: ISheetData_Activity_Activity;
	1276: ISheetData_Activity_Activity;
	1277: ISheetData_Activity_Activity;
	1278: ISheetData_Activity_Activity;
	1279: ISheetData_Activity_Activity;
	1280: ISheetData_Activity_Activity;
	1281: ISheetData_Activity_Activity;
	1282: ISheetData_Activity_Activity;
	1283: ISheetData_Activity_Activity;
	1284: ISheetData_Activity_Activity;
	1285: ISheetData_Activity_Activity;
	1286: ISheetData_Activity_Activity;
	1287: ISheetData_Activity_Activity;
	1288: ISheetData_Activity_Activity;
	1289: ISheetData_Activity_Activity;
	1290: ISheetData_Activity_Activity;
	1291: ISheetData_Activity_Activity;
	1292: ISheetData_Activity_Activity;
	1293: ISheetData_Activity_Activity;
	1294: ISheetData_Activity_Activity;
	1295: ISheetData_Activity_Activity;
	1296: ISheetData_Activity_Activity;
	1297: ISheetData_Activity_Activity;
	1298: ISheetData_Activity_Activity;
	1299: ISheetData_Activity_Activity;
	1300: ISheetData_Activity_Activity;
	1301: ISheetData_Activity_Activity;
	1302: ISheetData_Activity_Activity;
	1303: ISheetData_Activity_Activity;
	1304: ISheetData_Activity_Activity;
	1305: ISheetData_Activity_Activity;
	100000: ISheetData_Activity_Activity;
	100001: ISheetData_Activity_Activity;
	100100: ISheetData_Activity_Activity;
	100101: ISheetData_Activity_Activity;
	220210: ISheetData_Activity_Activity;
	220301: ISheetData_Activity_Activity;
	220302: ISheetData_Activity_Activity;
	220303: ISheetData_Activity_Activity;
	220304: ISheetData_Activity_Activity;
	220305: ISheetData_Activity_Activity;
	220306: ISheetData_Activity_Activity;
	220307: ISheetData_Activity_Activity;
	220308: ISheetData_Activity_Activity;
	220309: ISheetData_Activity_Activity;
	220401: ISheetData_Activity_Activity;
	220402: ISheetData_Activity_Activity;
	220403: ISheetData_Activity_Activity;
	220404: ISheetData_Activity_Activity;
	220405: ISheetData_Activity_Activity;
	220406: ISheetData_Activity_Activity;
	220407: ISheetData_Activity_Activity;
	220408: ISheetData_Activity_Activity;
	220409: ISheetData_Activity_Activity;
	220410: ISheetData_Activity_Activity;
	220411: ISheetData_Activity_Activity;
	220501: ISheetData_Activity_Activity;
	220502: ISheetData_Activity_Activity;
	220503: ISheetData_Activity_Activity;
	220504: ISheetData_Activity_Activity;
	220505: ISheetData_Activity_Activity;
	220506: ISheetData_Activity_Activity;
	220507: ISheetData_Activity_Activity;
	220508: ISheetData_Activity_Activity;
	220601: ISheetData_Activity_Activity;
	220602: ISheetData_Activity_Activity;
	220603: ISheetData_Activity_Activity;
	220604: ISheetData_Activity_Activity;
	220605: ISheetData_Activity_Activity;
	220606: ISheetData_Activity_Activity;
	220607: ISheetData_Activity_Activity;
	220701: ISheetData_Activity_Activity;
	220702: ISheetData_Activity_Activity;
	220703: ISheetData_Activity_Activity;
	220704: ISheetData_Activity_Activity;
	220705: ISheetData_Activity_Activity;
	220706: ISheetData_Activity_Activity;
	220707: ISheetData_Activity_Activity;
	220708: ISheetData_Activity_Activity;
	220710: ISheetData_Activity_Activity;
	220711: ISheetData_Activity_Activity;
	220712: ISheetData_Activity_Activity;
	220801: ISheetData_Activity_Activity;
	220802: ISheetData_Activity_Activity;
	220803: ISheetData_Activity_Activity;
	220804: ISheetData_Activity_Activity;
	220805: ISheetData_Activity_Activity;
	220806: ISheetData_Activity_Activity;
	220807: ISheetData_Activity_Activity;
	220811: ISheetData_Activity_Activity;
	220812: ISheetData_Activity_Activity;
	220813: ISheetData_Activity_Activity;
	220821: ISheetData_Activity_Activity;
	220822: ISheetData_Activity_Activity;
	220901: ISheetData_Activity_Activity;
	220902: ISheetData_Activity_Activity;
	220903: ISheetData_Activity_Activity;
	220904: ISheetData_Activity_Activity;
	220905: ISheetData_Activity_Activity;
	220906: ISheetData_Activity_Activity;
	220907: ISheetData_Activity_Activity;
	220908: ISheetData_Activity_Activity;
	220909: ISheetData_Activity_Activity;
	220910: ISheetData_Activity_Activity;
	220911: ISheetData_Activity_Activity;
	221001: ISheetData_Activity_Activity;
	221002: ISheetData_Activity_Activity;
	221003: ISheetData_Activity_Activity;
	221004: ISheetData_Activity_Activity;
	221005: ISheetData_Activity_Activity;
	221006: ISheetData_Activity_Activity;
	221007: ISheetData_Activity_Activity;
	221101: ISheetData_Activity_Activity;
	221102: ISheetData_Activity_Activity;
	221103: ISheetData_Activity_Activity;
	221104: ISheetData_Activity_Activity;
	221105: ISheetData_Activity_Activity;
	221106: ISheetData_Activity_Activity;
	221107: ISheetData_Activity_Activity;
	221108: ISheetData_Activity_Activity;
	221109: ISheetData_Activity_Activity;
	221110: ISheetData_Activity_Activity;
	221111: ISheetData_Activity_Activity;
	221112: ISheetData_Activity_Activity;
	221113: ISheetData_Activity_Activity;
	221114: ISheetData_Activity_Activity;
	221201: ISheetData_Activity_Activity;
	221202: ISheetData_Activity_Activity;
	221203: ISheetData_Activity_Activity;
	221204: ISheetData_Activity_Activity;
	221205: ISheetData_Activity_Activity;
	221206: ISheetData_Activity_Activity;
	221207: ISheetData_Activity_Activity;
	221208: ISheetData_Activity_Activity;
	221209: ISheetData_Activity_Activity;
	230101: ISheetData_Activity_Activity;
	230102: ISheetData_Activity_Activity;
	230103: ISheetData_Activity_Activity;
	230105: ISheetData_Activity_Activity;
	230106: ISheetData_Activity_Activity;
	230107: ISheetData_Activity_Activity;
	230108: ISheetData_Activity_Activity;
	230109: ISheetData_Activity_Activity;
	230110: ISheetData_Activity_Activity;
	230111: ISheetData_Activity_Activity;
	230112: ISheetData_Activity_Activity;
	230113: ISheetData_Activity_Activity;
	230114: ISheetData_Activity_Activity;
	230115: ISheetData_Activity_Activity;
	230116: ISheetData_Activity_Activity;
	230117: ISheetData_Activity_Activity;
	230118: ISheetData_Activity_Activity;
	230119: ISheetData_Activity_Activity;
	230120: ISheetData_Activity_Activity;
	230121: ISheetData_Activity_Activity;
	230122: ISheetData_Activity_Activity;
	230123: ISheetData_Activity_Activity;
	230124: ISheetData_Activity_Activity;
	230125: ISheetData_Activity_Activity;
	230126: ISheetData_Activity_Activity;
	230127: ISheetData_Activity_Activity;
	230128: ISheetData_Activity_Activity;
	230129: ISheetData_Activity_Activity;
	230130: ISheetData_Activity_Activity;
	230131: ISheetData_Activity_Activity;
	230132: ISheetData_Activity_Activity;
	230133: ISheetData_Activity_Activity;
	230134: ISheetData_Activity_Activity;
	230135: ISheetData_Activity_Activity;
	230136: ISheetData_Activity_Activity;
	230137: ISheetData_Activity_Activity;
	230138: ISheetData_Activity_Activity;
	230139: ISheetData_Activity_Activity;
	230140: ISheetData_Activity_Activity;
	230141: ISheetData_Activity_Activity;
	230142: ISheetData_Activity_Activity;
	230143: ISheetData_Activity_Activity;
	230201: ISheetData_Activity_Activity;
	230202: ISheetData_Activity_Activity;
	230203: ISheetData_Activity_Activity;
	230204: ISheetData_Activity_Activity;
	230205: ISheetData_Activity_Activity;
	230206: ISheetData_Activity_Activity;
	230207: ISheetData_Activity_Activity;
	230208: ISheetData_Activity_Activity;
	230209: ISheetData_Activity_Activity;
	230301: ISheetData_Activity_Activity;
	230302: ISheetData_Activity_Activity;
	230303: ISheetData_Activity_Activity;
	230304: ISheetData_Activity_Activity;
	230305: ISheetData_Activity_Activity;
	230306: ISheetData_Activity_Activity;
	230307: ISheetData_Activity_Activity;
	230308: ISheetData_Activity_Activity;
	230309: ISheetData_Activity_Activity;
	230401: ISheetData_Activity_Activity;
	230402: ISheetData_Activity_Activity;
	230403: ISheetData_Activity_Activity;
	230404: ISheetData_Activity_Activity;
	230405: ISheetData_Activity_Activity;
	230406: ISheetData_Activity_Activity;
	230407: ISheetData_Activity_Activity;
	230408: ISheetData_Activity_Activity;
	230409: ISheetData_Activity_Activity;
	230410: ISheetData_Activity_Activity;
	230411: ISheetData_Activity_Activity;
	230412: ISheetData_Activity_Activity;
	230501: ISheetData_Activity_Activity;
	230502: ISheetData_Activity_Activity;
	230503: ISheetData_Activity_Activity;
	230504: ISheetData_Activity_Activity;
	230505: ISheetData_Activity_Activity;
	230506: ISheetData_Activity_Activity;
	230507: ISheetData_Activity_Activity;
	230508: ISheetData_Activity_Activity;
	230509: ISheetData_Activity_Activity;
	230601: ISheetData_Activity_Activity;
	230602: ISheetData_Activity_Activity;
	230603: ISheetData_Activity_Activity;
	230604: ISheetData_Activity_Activity;
	230605: ISheetData_Activity_Activity;
	230606: ISheetData_Activity_Activity;
	230607: ISheetData_Activity_Activity;
	230608: ISheetData_Activity_Activity;
	230609: ISheetData_Activity_Activity;
	230610: ISheetData_Activity_Activity;
	230611: ISheetData_Activity_Activity;
	230615: ISheetData_Activity_Activity;
	230620: ISheetData_Activity_Activity;
	230621: ISheetData_Activity_Activity;
	230622: ISheetData_Activity_Activity;
	230623: ISheetData_Activity_Activity;
	230624: ISheetData_Activity_Activity;
	230701: ISheetData_Activity_Activity;
	230702: ISheetData_Activity_Activity;
	230703: ISheetData_Activity_Activity;
	230704: ISheetData_Activity_Activity;
	230705: ISheetData_Activity_Activity;
	230706: ISheetData_Activity_Activity;
	230707: ISheetData_Activity_Activity;
	230708: ISheetData_Activity_Activity;
	230801: ISheetData_Activity_Activity;
	230802: ISheetData_Activity_Activity;
	230803: ISheetData_Activity_Activity;
	230804: ISheetData_Activity_Activity;
	230811: ISheetData_Activity_Activity;
	230812: ISheetData_Activity_Activity;
	230813: ISheetData_Activity_Activity;
	230814: ISheetData_Activity_Activity;
	230815: ISheetData_Activity_Activity;
	230816: ISheetData_Activity_Activity;
	230817: ISheetData_Activity_Activity;
	230818: ISheetData_Activity_Activity;
	230821: ISheetData_Activity_Activity;
	230822: ISheetData_Activity_Activity;
	230831: ISheetData_Activity_Activity;
	230901: ISheetData_Activity_Activity;
	230902: ISheetData_Activity_Activity;
	230903: ISheetData_Activity_Activity;
	230904: ISheetData_Activity_Activity;
	230905: ISheetData_Activity_Activity;
	230906: ISheetData_Activity_Activity;
	230907: ISheetData_Activity_Activity;
	230910: ISheetData_Activity_Activity;
	230911: ISheetData_Activity_Activity;
	230912: ISheetData_Activity_Activity;
	231001: ISheetData_Activity_Activity;
	231002: ISheetData_Activity_Activity;
	231003: ISheetData_Activity_Activity;
	231004: ISheetData_Activity_Activity;
	231005: ISheetData_Activity_Activity;
	231006: ISheetData_Activity_Activity;
	231007: ISheetData_Activity_Activity;
	231008: ISheetData_Activity_Activity;
	231009: ISheetData_Activity_Activity;
	231010: ISheetData_Activity_Activity;
	231021: ISheetData_Activity_Activity;
	231022: ISheetData_Activity_Activity;
	231101: ISheetData_Activity_Activity;
	231111: ISheetData_Activity_Activity;
	231112: ISheetData_Activity_Activity;
	231113: ISheetData_Activity_Activity;
	231114: ISheetData_Activity_Activity;
	231115: ISheetData_Activity_Activity;
	231116: ISheetData_Activity_Activity;
	231121: ISheetData_Activity_Activity;
	231122: ISheetData_Activity_Activity;
	231123: ISheetData_Activity_Activity;
	231124: ISheetData_Activity_Activity;
	231125: ISheetData_Activity_Activity;
	231126: ISheetData_Activity_Activity;
	231151: ISheetData_Activity_Activity;
	231161: ISheetData_Activity_Activity;
	231162: ISheetData_Activity_Activity;
	231163: ISheetData_Activity_Activity;
	231164: ISheetData_Activity_Activity;
	231165: ISheetData_Activity_Activity;
	231166: ISheetData_Activity_Activity;
	231171: ISheetData_Activity_Activity;
	231172: ISheetData_Activity_Activity;
	231173: ISheetData_Activity_Activity;
	231174: ISheetData_Activity_Activity;
	231201: ISheetData_Activity_Activity;
	231202: ISheetData_Activity_Activity;
	231203: ISheetData_Activity_Activity;
	231204: ISheetData_Activity_Activity;
	231210: ISheetData_Activity_Activity;
	231211: ISheetData_Activity_Activity;
	231220: ISheetData_Activity_Activity;
	231221: ISheetData_Activity_Activity;
	231231: ISheetData_Activity_Activity;
	231232: ISheetData_Activity_Activity;
	231233: ISheetData_Activity_Activity;
	231234: ISheetData_Activity_Activity;
	231235: ISheetData_Activity_Activity;
	231236: ISheetData_Activity_Activity;
	231241: ISheetData_Activity_Activity;
	231242: ISheetData_Activity_Activity;
	231243: ISheetData_Activity_Activity;
	231244: ISheetData_Activity_Activity;
	231245: ISheetData_Activity_Activity;
	231246: ISheetData_Activity_Activity;
	231251: ISheetData_Activity_Activity;
	231252: ISheetData_Activity_Activity;
	240101: ISheetData_Activity_Activity;
	240102: ISheetData_Activity_Activity;
	240103: ISheetData_Activity_Activity;
	240104: ISheetData_Activity_Activity;
	240111: ISheetData_Activity_Activity;
	240112: ISheetData_Activity_Activity;
	240113: ISheetData_Activity_Activity;
	240121: ISheetData_Activity_Activity;
	240122: ISheetData_Activity_Activity;
	240123: ISheetData_Activity_Activity;
	240124: ISheetData_Activity_Activity;
	240125: ISheetData_Activity_Activity;
	240126: ISheetData_Activity_Activity;
	240127: ISheetData_Activity_Activity;
	240128: ISheetData_Activity_Activity;
	240129: ISheetData_Activity_Activity;
	240130: ISheetData_Activity_Activity;
	240131: ISheetData_Activity_Activity;
	240132: ISheetData_Activity_Activity;
	240133: ISheetData_Activity_Activity;
	240134: ISheetData_Activity_Activity;
	240135: ISheetData_Activity_Activity;
	240136: ISheetData_Activity_Activity;
	240137: ISheetData_Activity_Activity;
	240138: ISheetData_Activity_Activity;
	240139: ISheetData_Activity_Activity;
	240140: ISheetData_Activity_Activity;
	240141: ISheetData_Activity_Activity;
	240142: ISheetData_Activity_Activity;
	240143: ISheetData_Activity_Activity;
	240144: ISheetData_Activity_Activity;
	240145: ISheetData_Activity_Activity;
	240146: ISheetData_Activity_Activity;
	240147: ISheetData_Activity_Activity;
	240148: ISheetData_Activity_Activity;
	240149: ISheetData_Activity_Activity;
	240151: ISheetData_Activity_Activity;
	240152: ISheetData_Activity_Activity;
	240153: ISheetData_Activity_Activity;
	240154: ISheetData_Activity_Activity;
	240155: ISheetData_Activity_Activity;
	240156: ISheetData_Activity_Activity;
	240157: ISheetData_Activity_Activity;
	240158: ISheetData_Activity_Activity;
	240159: ISheetData_Activity_Activity;
	240160: ISheetData_Activity_Activity;
	240161: ISheetData_Activity_Activity;
	240162: ISheetData_Activity_Activity;
	240163: ISheetData_Activity_Activity;
	240164: ISheetData_Activity_Activity;
	240165: ISheetData_Activity_Activity;
	240166: ISheetData_Activity_Activity;
	240167: ISheetData_Activity_Activity;
	240168: ISheetData_Activity_Activity;
	240169: ISheetData_Activity_Activity;
	240170: ISheetData_Activity_Activity;
	240171: ISheetData_Activity_Activity;
	240172: ISheetData_Activity_Activity;
	240173: ISheetData_Activity_Activity;
	240174: ISheetData_Activity_Activity;
	240175: ISheetData_Activity_Activity;
	240176: ISheetData_Activity_Activity;
	240177: ISheetData_Activity_Activity;
	240178: ISheetData_Activity_Activity;
	240179: ISheetData_Activity_Activity;
	240201: ISheetData_Activity_Activity;
	240202: ISheetData_Activity_Activity;
	240203: ISheetData_Activity_Activity;
	240204: ISheetData_Activity_Activity;
	240205: ISheetData_Activity_Activity;
	240206: ISheetData_Activity_Activity;
	240207: ISheetData_Activity_Activity;
	240208: ISheetData_Activity_Activity;
	240211: ISheetData_Activity_Activity;
	240212: ISheetData_Activity_Activity;
	240213: ISheetData_Activity_Activity;
	240301: ISheetData_Activity_Activity;
	240302: ISheetData_Activity_Activity;
	240303: ISheetData_Activity_Activity;
	240304: ISheetData_Activity_Activity;
	240305: ISheetData_Activity_Activity;
	240311: ISheetData_Activity_Activity;
	240312: ISheetData_Activity_Activity;
	240313: ISheetData_Activity_Activity;
	240314: ISheetData_Activity_Activity;
	240315: ISheetData_Activity_Activity;
	240316: ISheetData_Activity_Activity;
	240317: ISheetData_Activity_Activity;
	240351: ISheetData_Activity_Activity;
	240401: ISheetData_Activity_Activity;
	240402: ISheetData_Activity_Activity;
	240403: ISheetData_Activity_Activity;
	240404: ISheetData_Activity_Activity;
	240405: ISheetData_Activity_Activity;
	240406: ISheetData_Activity_Activity;
	240411: ISheetData_Activity_Activity;
	240412: ISheetData_Activity_Activity;
	240421: ISheetData_Activity_Activity;
	240422: ISheetData_Activity_Activity;
	240431: ISheetData_Activity_Activity;
	240432: ISheetData_Activity_Activity;
	240441: ISheetData_Activity_Activity;
	240442: ISheetData_Activity_Activity;
	240443: ISheetData_Activity_Activity;
	240451: ISheetData_Activity_Activity;
	240452: ISheetData_Activity_Activity;
	240453: ISheetData_Activity_Activity;
	240454: ISheetData_Activity_Activity;
	240455: ISheetData_Activity_Activity;
	240501: ISheetData_Activity_Activity;
	240503: ISheetData_Activity_Activity;
	240504: ISheetData_Activity_Activity;
	240505: ISheetData_Activity_Activity;
	240506: ISheetData_Activity_Activity;
	240511: ISheetData_Activity_Activity;
	240512: ISheetData_Activity_Activity;
	240513: ISheetData_Activity_Activity;
	240514: ISheetData_Activity_Activity;
	240515: ISheetData_Activity_Activity;
	240516: ISheetData_Activity_Activity;
	240550: ISheetData_Activity_Activity;
	240601: ISheetData_Activity_Activity;
	240602: ISheetData_Activity_Activity;
	240603: ISheetData_Activity_Activity;
	240604: ISheetData_Activity_Activity;
	240605: ISheetData_Activity_Activity;
	240606: ISheetData_Activity_Activity;
	240607: ISheetData_Activity_Activity;
	240610: ISheetData_Activity_Activity;
	240611: ISheetData_Activity_Activity;
	240612: ISheetData_Activity_Activity;
	240613: ISheetData_Activity_Activity;
	240620: ISheetData_Activity_Activity;
	240621: ISheetData_Activity_Activity;
	240622: ISheetData_Activity_Activity;
	240623: ISheetData_Activity_Activity;
	240624: ISheetData_Activity_Activity;
	240625: ISheetData_Activity_Activity;
	240630: ISheetData_Activity_Activity;
	240631: ISheetData_Activity_Activity;
	240632: ISheetData_Activity_Activity;
	240633: ISheetData_Activity_Activity;
	240634: ISheetData_Activity_Activity;
	240635: ISheetData_Activity_Activity;
	240701: ISheetData_Activity_Activity;
	240702: ISheetData_Activity_Activity;
	240710: ISheetData_Activity_Activity;
	240711: ISheetData_Activity_Activity;
	240712: ISheetData_Activity_Activity;
	240720: ISheetData_Activity_Activity;
	240721: ISheetData_Activity_Activity;
	240722: ISheetData_Activity_Activity;
	240723: ISheetData_Activity_Activity;
	240724: ISheetData_Activity_Activity;
	240725: ISheetData_Activity_Activity;
	240726: ISheetData_Activity_Activity;
	240727: ISheetData_Activity_Activity;
	240801: ISheetData_Activity_Activity;
	240802: ISheetData_Activity_Activity;
	240811: ISheetData_Activity_Activity;
	240812: ISheetData_Activity_Activity;
	240813: ISheetData_Activity_Activity;
	240814: ISheetData_Activity_Activity;
	240815: ISheetData_Activity_Activity;
	240820: ISheetData_Activity_Activity;
	240821: ISheetData_Activity_Activity;
	240822: ISheetData_Activity_Activity;
	240823: ISheetData_Activity_Activity;
	240824: ISheetData_Activity_Activity;
	240825: ISheetData_Activity_Activity;
	240826: ISheetData_Activity_Activity;
	240830: ISheetData_Activity_Activity;
	240831: ISheetData_Activity_Activity;
	240832: ISheetData_Activity_Activity;
	240833: ISheetData_Activity_Activity;
	240834: ISheetData_Activity_Activity;
	240840: ISheetData_Activity_Activity;
	240841: ISheetData_Activity_Activity;
	240842: ISheetData_Activity_Activity;
	240843: ISheetData_Activity_Activity;
	240844: ISheetData_Activity_Activity;
	240860: ISheetData_Activity_Activity;
	240901: ISheetData_Activity_Activity;
	240902: ISheetData_Activity_Activity;
	240910: ISheetData_Activity_Activity;
	240911: ISheetData_Activity_Activity;
	240912: ISheetData_Activity_Activity;
	240920: ISheetData_Activity_Activity;
	240921: ISheetData_Activity_Activity;
	240922: ISheetData_Activity_Activity;
	240923: ISheetData_Activity_Activity;
	240930: ISheetData_Activity_Activity;
	240931: ISheetData_Activity_Activity;
	240932: ISheetData_Activity_Activity;
	240933: ISheetData_Activity_Activity;
	241001: ISheetData_Activity_Activity;
	241002: ISheetData_Activity_Activity;
	241010: ISheetData_Activity_Activity;
	241011: ISheetData_Activity_Activity;
	241012: ISheetData_Activity_Activity;
	241020: ISheetData_Activity_Activity;
	241021: ISheetData_Activity_Activity;
	241022: ISheetData_Activity_Activity;
	241023: ISheetData_Activity_Activity;
	241024: ISheetData_Activity_Activity;
	241025: ISheetData_Activity_Activity;
	241030: ISheetData_Activity_Activity;
	241031: ISheetData_Activity_Activity;
	241032: ISheetData_Activity_Activity;
	241033: ISheetData_Activity_Activity;
	241034: ISheetData_Activity_Activity;
	241035: ISheetData_Activity_Activity;
	241091: ISheetData_Activity_Activity;
	241101: ISheetData_Activity_Activity;
	241102: ISheetData_Activity_Activity;
	241103: ISheetData_Activity_Activity;
	241104: ISheetData_Activity_Activity;
	241105: ISheetData_Activity_Activity;
	241106: ISheetData_Activity_Activity;
	241107: ISheetData_Activity_Activity;
	241108: ISheetData_Activity_Activity;
	241110: ISheetData_Activity_Activity;
	241111: ISheetData_Activity_Activity;
	241112: ISheetData_Activity_Activity;
	241121: ISheetData_Activity_Activity;
	241122: ISheetData_Activity_Activity;
	241131: ISheetData_Activity_Activity;
	241132: ISheetData_Activity_Activity;
	241141: ISheetData_Activity_Activity;
	241201: ISheetData_Activity_Activity;
	241202: ISheetData_Activity_Activity;
	241203: ISheetData_Activity_Activity;
	241210: ISheetData_Activity_Activity;
	241211: ISheetData_Activity_Activity;
	241212: ISheetData_Activity_Activity;
	241220: ISheetData_Activity_Activity;
	241221: ISheetData_Activity_Activity;
	241222: ISheetData_Activity_Activity;
	241223: ISheetData_Activity_Activity;
	241224: ISheetData_Activity_Activity;
	241225: ISheetData_Activity_Activity;
	241226: ISheetData_Activity_Activity;
	241227: ISheetData_Activity_Activity;
	241228: ISheetData_Activity_Activity;
	241229: ISheetData_Activity_Activity;
	241230: ISheetData_Activity_Activity;
	241231: ISheetData_Activity_Activity;
	241232: ISheetData_Activity_Activity;
	241233: ISheetData_Activity_Activity;
	241234: ISheetData_Activity_Activity;
	241235: ISheetData_Activity_Activity;
	241236: ISheetData_Activity_Activity;
	241237: ISheetData_Activity_Activity;
	241238: ISheetData_Activity_Activity;
	241239: ISheetData_Activity_Activity;
	241240: ISheetData_Activity_Activity;
	250101: ISheetData_Activity_Activity;
	250102: ISheetData_Activity_Activity;
	250103: ISheetData_Activity_Activity;
	250104: ISheetData_Activity_Activity;
	250111: ISheetData_Activity_Activity;
	250112: ISheetData_Activity_Activity;
	250120: ISheetData_Activity_Activity;
	250121: ISheetData_Activity_Activity;
	250122: ISheetData_Activity_Activity;
	250125: ISheetData_Activity_Activity;
	250126: ISheetData_Activity_Activity;
	250127: ISheetData_Activity_Activity;
	250128: ISheetData_Activity_Activity;
	250129: ISheetData_Activity_Activity;
	250130: ISheetData_Activity_Activity;
	250131: ISheetData_Activity_Activity;
	250132: ISheetData_Activity_Activity;
	250133: ISheetData_Activity_Activity;
	250134: ISheetData_Activity_Activity;
	250135: ISheetData_Activity_Activity;
	250136: ISheetData_Activity_Activity;
	250137: ISheetData_Activity_Activity;
	250138: ISheetData_Activity_Activity;
	250139: ISheetData_Activity_Activity;
	250140: ISheetData_Activity_Activity;
	250141: ISheetData_Activity_Activity;
	250142: ISheetData_Activity_Activity;
	250143: ISheetData_Activity_Activity;
	250144: ISheetData_Activity_Activity;
	250145: ISheetData_Activity_Activity;
	250146: ISheetData_Activity_Activity;
	250147: ISheetData_Activity_Activity;
	250148: ISheetData_Activity_Activity;
	250149: ISheetData_Activity_Activity;
	250150: ISheetData_Activity_Activity;
	250151: ISheetData_Activity_Activity;
	250152: ISheetData_Activity_Activity;
	250153: ISheetData_Activity_Activity;
	250154: ISheetData_Activity_Activity;
	250155: ISheetData_Activity_Activity;
	250156: ISheetData_Activity_Activity;
	250157: ISheetData_Activity_Activity;
	250158: ISheetData_Activity_Activity;
	250159: ISheetData_Activity_Activity;
	250160: ISheetData_Activity_Activity;
	250161: ISheetData_Activity_Activity;
	250162: ISheetData_Activity_Activity;
	250163: ISheetData_Activity_Activity;
	250164: ISheetData_Activity_Activity;
	250165: ISheetData_Activity_Activity;
	250166: ISheetData_Activity_Activity;
	250167: ISheetData_Activity_Activity;
	250168: ISheetData_Activity_Activity;
	250169: ISheetData_Activity_Activity;
	250170: ISheetData_Activity_Activity;
	250171: ISheetData_Activity_Activity;
	250172: ISheetData_Activity_Activity;
	250173: ISheetData_Activity_Activity;
	250174: ISheetData_Activity_Activity;
	250175: ISheetData_Activity_Activity;
	250176: ISheetData_Activity_Activity;
	250177: ISheetData_Activity_Activity;
	250178: ISheetData_Activity_Activity;
	250179: ISheetData_Activity_Activity;
	250180: ISheetData_Activity_Activity;
	250181: ISheetData_Activity_Activity;
	250182: ISheetData_Activity_Activity;
	250183: ISheetData_Activity_Activity;
	250184: ISheetData_Activity_Activity;
	250185: ISheetData_Activity_Activity;
	250186: ISheetData_Activity_Activity;
	250187: ISheetData_Activity_Activity;
	250188: ISheetData_Activity_Activity;
	250189: ISheetData_Activity_Activity;
	250190: ISheetData_Activity_Activity;
	250191: ISheetData_Activity_Activity;
	250192: ISheetData_Activity_Activity;
	250193: ISheetData_Activity_Activity;
	250194: ISheetData_Activity_Activity;
	250195: ISheetData_Activity_Activity;
	250196: ISheetData_Activity_Activity;
	250197: ISheetData_Activity_Activity;
	250201: ISheetData_Activity_Activity;
	250202: ISheetData_Activity_Activity;
	250210: ISheetData_Activity_Activity;
	250211: ISheetData_Activity_Activity;
	250212: ISheetData_Activity_Activity;
	250220: ISheetData_Activity_Activity;
	250221: ISheetData_Activity_Activity;
	250222: ISheetData_Activity_Activity;
	250223: ISheetData_Activity_Activity;
	250230: ISheetData_Activity_Activity;
	250231: ISheetData_Activity_Activity;
	250232: ISheetData_Activity_Activity;
	250233: ISheetData_Activity_Activity;
	250301: ISheetData_Activity_Activity;
	250302: ISheetData_Activity_Activity;
	250310: ISheetData_Activity_Activity;
	250311: ISheetData_Activity_Activity;
	250312: ISheetData_Activity_Activity;
	250320: ISheetData_Activity_Activity;
	250321: ISheetData_Activity_Activity;
	250322: ISheetData_Activity_Activity;
	250323: ISheetData_Activity_Activity;
	250330: ISheetData_Activity_Activity;
	250331: ISheetData_Activity_Activity;
	250332: ISheetData_Activity_Activity;
	250333: ISheetData_Activity_Activity;
	250391: ISheetData_Activity_Activity;
	250401: ISheetData_Activity_Activity;
	250402: ISheetData_Activity_Activity;
	250403: ISheetData_Activity_Activity;
	250405: ISheetData_Activity_Activity;
	250411: ISheetData_Activity_Activity;
	250412: ISheetData_Activity_Activity;
	250420: ISheetData_Activity_Activity;
	250421: ISheetData_Activity_Activity;
	250422: ISheetData_Activity_Activity;
	250430: ISheetData_Activity_Activity;
	250431: ISheetData_Activity_Activity;
	250440: ISheetData_Activity_Activity;
	250441: ISheetData_Activity_Activity;
	250501: ISheetData_Activity_Activity;
	250502: ISheetData_Activity_Activity;
	250510: ISheetData_Activity_Activity;
	250511: ISheetData_Activity_Activity;
	250512: ISheetData_Activity_Activity;
	250520: ISheetData_Activity_Activity;
	250521: ISheetData_Activity_Activity;
	250522: ISheetData_Activity_Activity;
	250523: ISheetData_Activity_Activity;
	250530: ISheetData_Activity_Activity;
	250531: ISheetData_Activity_Activity;
	250532: ISheetData_Activity_Activity;
	250533: ISheetData_Activity_Activity;
	250601: ISheetData_Activity_Activity;
	250602: ISheetData_Activity_Activity;
	250603: ISheetData_Activity_Activity;
	250604: ISheetData_Activity_Activity;
	250610: ISheetData_Activity_Activity;
	250611: ISheetData_Activity_Activity;
	250612: ISheetData_Activity_Activity;
	250620: ISheetData_Activity_Activity;
	250621: ISheetData_Activity_Activity;
	250622: ISheetData_Activity_Activity;
	250623: ISheetData_Activity_Activity;
	250624: ISheetData_Activity_Activity;
	250625: ISheetData_Activity_Activity;
	250630: ISheetData_Activity_Activity;
	250631: ISheetData_Activity_Activity;
	250632: ISheetData_Activity_Activity;
	250633: ISheetData_Activity_Activity;
	250634: ISheetData_Activity_Activity;
	250635: ISheetData_Activity_Activity;
	250701: ISheetData_Activity_Activity;
	250702: ISheetData_Activity_Activity;
	250710: ISheetData_Activity_Activity;
	250711: ISheetData_Activity_Activity;
	250712: ISheetData_Activity_Activity;
	250720: ISheetData_Activity_Activity;
	250721: ISheetData_Activity_Activity;
	250722: ISheetData_Activity_Activity;
	250723: ISheetData_Activity_Activity;
	250730: ISheetData_Activity_Activity;
	250731: ISheetData_Activity_Activity;
	250732: ISheetData_Activity_Activity;
	250733: ISheetData_Activity_Activity;
	250790: ISheetData_Activity_Activity;
	250811: ISheetData_Activity_Activity;
	250812: ISheetData_Activity_Activity;
	250820: ISheetData_Activity_Activity;
	250821: ISheetData_Activity_Activity;
	250830: ISheetData_Activity_Activity;
	250831: ISheetData_Activity_Activity;
	250832: ISheetData_Activity_Activity;
	250840: ISheetData_Activity_Activity;
	250841: ISheetData_Activity_Activity;
	250842: ISheetData_Activity_Activity;
	250843: ISheetData_Activity_Activity;
	250844: ISheetData_Activity_Activity;
	250850: ISheetData_Activity_Activity;
	250851: ISheetData_Activity_Activity;
	250852: ISheetData_Activity_Activity;
	250853: ISheetData_Activity_Activity;
	250854: ISheetData_Activity_Activity;
	250860: ISheetData_Activity_Activity;
	250890: ISheetData_Activity_Activity;
	250891: ISheetData_Activity_Activity;
	250892: ISheetData_Activity_Activity;
	250893: ISheetData_Activity_Activity;
	250894: ISheetData_Activity_Activity;
	250895: ISheetData_Activity_Activity;
	250901: ISheetData_Activity_Activity;
	250902: ISheetData_Activity_Activity;
	250910: ISheetData_Activity_Activity;
	250911: ISheetData_Activity_Activity;
	250912: ISheetData_Activity_Activity;
	250920: ISheetData_Activity_Activity;
	250921: ISheetData_Activity_Activity;
	250922: ISheetData_Activity_Activity;
	250923: ISheetData_Activity_Activity;
	250925: ISheetData_Activity_Activity;
	250926: ISheetData_Activity_Activity;
	250927: ISheetData_Activity_Activity;
	250928: ISheetData_Activity_Activity;
}
declare interface ISheetData_Activity_Activity {
	/** 活动id */
	id: number;
	/** 活动名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 开始时间 */
	start_time: string;
	/** 结束时间 */
	end_time: string;
	/** 活动类型 */
	type: string;
	/** 是否需要弹出来 */
	need_popout: number;
	/** 分服启用，1中文服 2日服 3美服 */
	zone: string;
}
//#endregion

//#region task --- unique
declare interface ISheet_Activity_Task {
	rows: ISheetData_Activity_Task[];
	1001001: ISheetData_Activity_Task;
	1001002: ISheetData_Activity_Task;
	1001003: ISheetData_Activity_Task;
	1001004: ISheetData_Activity_Task;
	1001005: ISheetData_Activity_Task;
	1001006: ISheetData_Activity_Task;
	1001007: ISheetData_Activity_Task;
	1001008: ISheetData_Activity_Task;
	1001009: ISheetData_Activity_Task;
	1001010: ISheetData_Activity_Task;
	1001011: ISheetData_Activity_Task;
	1001012: ISheetData_Activity_Task;
	1001013: ISheetData_Activity_Task;
	1001014: ISheetData_Activity_Task;
	1001015: ISheetData_Activity_Task;
	1001016: ISheetData_Activity_Task;
	1001017: ISheetData_Activity_Task;
	1001018: ISheetData_Activity_Task;
	1001019: ISheetData_Activity_Task;
	1001020: ISheetData_Activity_Task;
	1001021: ISheetData_Activity_Task;
	1001022: ISheetData_Activity_Task;
	1001023: ISheetData_Activity_Task;
	1001024: ISheetData_Activity_Task;
	1001025: ISheetData_Activity_Task;
	1001026: ISheetData_Activity_Task;
	1001027: ISheetData_Activity_Task;
	1001028: ISheetData_Activity_Task;
	1001029: ISheetData_Activity_Task;
	1001030: ISheetData_Activity_Task;
	1001031: ISheetData_Activity_Task;
	1001032: ISheetData_Activity_Task;
	1001033: ISheetData_Activity_Task;
	1006001: ISheetData_Activity_Task;
	1006002: ISheetData_Activity_Task;
	1006003: ISheetData_Activity_Task;
	1006004: ISheetData_Activity_Task;
	1006005: ISheetData_Activity_Task;
	1006006: ISheetData_Activity_Task;
	1006007: ISheetData_Activity_Task;
	1006008: ISheetData_Activity_Task;
	1006009: ISheetData_Activity_Task;
	1006010: ISheetData_Activity_Task;
	1006011: ISheetData_Activity_Task;
	1006012: ISheetData_Activity_Task;
	1006013: ISheetData_Activity_Task;
	1006014: ISheetData_Activity_Task;
	1006015: ISheetData_Activity_Task;
	1006016: ISheetData_Activity_Task;
	1006017: ISheetData_Activity_Task;
	1006018: ISheetData_Activity_Task;
	1006019: ISheetData_Activity_Task;
	1006020: ISheetData_Activity_Task;
	1006021: ISheetData_Activity_Task;
	1006022: ISheetData_Activity_Task;
	1006023: ISheetData_Activity_Task;
	1006024: ISheetData_Activity_Task;
	1006025: ISheetData_Activity_Task;
	1006026: ISheetData_Activity_Task;
	1006027: ISheetData_Activity_Task;
	1018001: ISheetData_Activity_Task;
	1018002: ISheetData_Activity_Task;
	1018003: ISheetData_Activity_Task;
	1018004: ISheetData_Activity_Task;
	1018005: ISheetData_Activity_Task;
	1018006: ISheetData_Activity_Task;
	1018007: ISheetData_Activity_Task;
	1018008: ISheetData_Activity_Task;
	1018009: ISheetData_Activity_Task;
	1018010: ISheetData_Activity_Task;
	1018011: ISheetData_Activity_Task;
	1018012: ISheetData_Activity_Task;
	1018013: ISheetData_Activity_Task;
	1018014: ISheetData_Activity_Task;
	1018015: ISheetData_Activity_Task;
	1018016: ISheetData_Activity_Task;
	1018017: ISheetData_Activity_Task;
	1018018: ISheetData_Activity_Task;
	1018019: ISheetData_Activity_Task;
	1018020: ISheetData_Activity_Task;
	1018021: ISheetData_Activity_Task;
	1018022: ISheetData_Activity_Task;
	1018023: ISheetData_Activity_Task;
	1018024: ISheetData_Activity_Task;
	1031001: ISheetData_Activity_Task;
	1031002: ISheetData_Activity_Task;
	1031003: ISheetData_Activity_Task;
	1031004: ISheetData_Activity_Task;
	1031005: ISheetData_Activity_Task;
	1031006: ISheetData_Activity_Task;
	1031007: ISheetData_Activity_Task;
	1031008: ISheetData_Activity_Task;
	1031009: ISheetData_Activity_Task;
	1031010: ISheetData_Activity_Task;
	1031011: ISheetData_Activity_Task;
	1031012: ISheetData_Activity_Task;
	1031013: ISheetData_Activity_Task;
	1031014: ISheetData_Activity_Task;
	1031015: ISheetData_Activity_Task;
	1031016: ISheetData_Activity_Task;
	1031017: ISheetData_Activity_Task;
	1031018: ISheetData_Activity_Task;
	1031019: ISheetData_Activity_Task;
	1031020: ISheetData_Activity_Task;
	1031021: ISheetData_Activity_Task;
	1031022: ISheetData_Activity_Task;
	1031023: ISheetData_Activity_Task;
	1031024: ISheetData_Activity_Task;
	1031025: ISheetData_Activity_Task;
	1031026: ISheetData_Activity_Task;
	1031027: ISheetData_Activity_Task;
	1031028: ISheetData_Activity_Task;
	1031029: ISheetData_Activity_Task;
	1031030: ISheetData_Activity_Task;
	1084001: ISheetData_Activity_Task;
	1084002: ISheetData_Activity_Task;
	1084003: ISheetData_Activity_Task;
	1084004: ISheetData_Activity_Task;
	1084005: ISheetData_Activity_Task;
	1084006: ISheetData_Activity_Task;
	1084007: ISheetData_Activity_Task;
	1084008: ISheetData_Activity_Task;
	1084009: ISheetData_Activity_Task;
	1084010: ISheetData_Activity_Task;
	1084011: ISheetData_Activity_Task;
	1084012: ISheetData_Activity_Task;
	1084013: ISheetData_Activity_Task;
	1084014: ISheetData_Activity_Task;
	1084015: ISheetData_Activity_Task;
	1084016: ISheetData_Activity_Task;
	1084017: ISheetData_Activity_Task;
	1084018: ISheetData_Activity_Task;
	1084019: ISheetData_Activity_Task;
	1084020: ISheetData_Activity_Task;
	1084021: ISheetData_Activity_Task;
	1084022: ISheetData_Activity_Task;
	1084023: ISheetData_Activity_Task;
	1084024: ISheetData_Activity_Task;
	1084025: ISheetData_Activity_Task;
	1084026: ISheetData_Activity_Task;
	1084027: ISheetData_Activity_Task;
	1084028: ISheetData_Activity_Task;
	1084029: ISheetData_Activity_Task;
	1084030: ISheetData_Activity_Task;
	1185001: ISheetData_Activity_Task;
	1185002: ISheetData_Activity_Task;
	1185003: ISheetData_Activity_Task;
	1185004: ISheetData_Activity_Task;
	1185005: ISheetData_Activity_Task;
	1185006: ISheetData_Activity_Task;
	1185007: ISheetData_Activity_Task;
	1185008: ISheetData_Activity_Task;
	1185009: ISheetData_Activity_Task;
	1185010: ISheetData_Activity_Task;
	1185011: ISheetData_Activity_Task;
	1185012: ISheetData_Activity_Task;
	1185013: ISheetData_Activity_Task;
	1185014: ISheetData_Activity_Task;
	1185015: ISheetData_Activity_Task;
	1185016: ISheetData_Activity_Task;
	1185017: ISheetData_Activity_Task;
	1185018: ISheetData_Activity_Task;
	1185019: ISheetData_Activity_Task;
	1185020: ISheetData_Activity_Task;
	1185021: ISheetData_Activity_Task;
	1185022: ISheetData_Activity_Task;
	1185023: ISheetData_Activity_Task;
	1185024: ISheetData_Activity_Task;
	1185025: ISheetData_Activity_Task;
	1185026: ISheetData_Activity_Task;
	1185027: ISheetData_Activity_Task;
	1185028: ISheetData_Activity_Task;
	1203001: ISheetData_Activity_Task;
	1203002: ISheetData_Activity_Task;
	1203003: ISheetData_Activity_Task;
	1203004: ISheetData_Activity_Task;
	1203005: ISheetData_Activity_Task;
	1203006: ISheetData_Activity_Task;
	1203007: ISheetData_Activity_Task;
	1203008: ISheetData_Activity_Task;
	1203009: ISheetData_Activity_Task;
	1203010: ISheetData_Activity_Task;
	1203011: ISheetData_Activity_Task;
	1203012: ISheetData_Activity_Task;
	1203013: ISheetData_Activity_Task;
	1203014: ISheetData_Activity_Task;
	1203015: ISheetData_Activity_Task;
	1203016: ISheetData_Activity_Task;
	1203017: ISheetData_Activity_Task;
	1203018: ISheetData_Activity_Task;
	1203019: ISheetData_Activity_Task;
	1203020: ISheetData_Activity_Task;
	1203021: ISheetData_Activity_Task;
	1203022: ISheetData_Activity_Task;
	1203023: ISheetData_Activity_Task;
	1203024: ISheetData_Activity_Task;
	1203025: ISheetData_Activity_Task;
	1203026: ISheetData_Activity_Task;
	1203027: ISheetData_Activity_Task;
	1203028: ISheetData_Activity_Task;
	1203029: ISheetData_Activity_Task;
	1203030: ISheetData_Activity_Task;
	1203031: ISheetData_Activity_Task;
	1203032: ISheetData_Activity_Task;
	1203033: ISheetData_Activity_Task;
	1203034: ISheetData_Activity_Task;
	1203035: ISheetData_Activity_Task;
	1203036: ISheetData_Activity_Task;
	1203037: ISheetData_Activity_Task;
	1203038: ISheetData_Activity_Task;
	1203039: ISheetData_Activity_Task;
	1203040: ISheetData_Activity_Task;
	1203041: ISheetData_Activity_Task;
	1203042: ISheetData_Activity_Task;
	1240001: ISheetData_Activity_Task;
	1240002: ISheetData_Activity_Task;
	1240003: ISheetData_Activity_Task;
	1240004: ISheetData_Activity_Task;
	1240005: ISheetData_Activity_Task;
	1240006: ISheetData_Activity_Task;
	1240007: ISheetData_Activity_Task;
	1240008: ISheetData_Activity_Task;
	1240009: ISheetData_Activity_Task;
	1240010: ISheetData_Activity_Task;
	1240011: ISheetData_Activity_Task;
	1240012: ISheetData_Activity_Task;
	1240013: ISheetData_Activity_Task;
	1240014: ISheetData_Activity_Task;
	1240015: ISheetData_Activity_Task;
	1240016: ISheetData_Activity_Task;
	1240017: ISheetData_Activity_Task;
	1240018: ISheetData_Activity_Task;
	1240019: ISheetData_Activity_Task;
	1240020: ISheetData_Activity_Task;
	1240021: ISheetData_Activity_Task;
	1240022: ISheetData_Activity_Task;
	1240023: ISheetData_Activity_Task;
	1240024: ISheetData_Activity_Task;
	1240025: ISheetData_Activity_Task;
	1240026: ISheetData_Activity_Task;
	1240027: ISheetData_Activity_Task;
	1240028: ISheetData_Activity_Task;
	1240029: ISheetData_Activity_Task;
	1240030: ISheetData_Activity_Task;
	1240031: ISheetData_Activity_Task;
	1240032: ISheetData_Activity_Task;
	1240033: ISheetData_Activity_Task;
	1240034: ISheetData_Activity_Task;
	1240035: ISheetData_Activity_Task;
	1240036: ISheetData_Activity_Task;
	1240037: ISheetData_Activity_Task;
	1240038: ISheetData_Activity_Task;
	1240039: ISheetData_Activity_Task;
	1240040: ISheetData_Activity_Task;
	1240041: ISheetData_Activity_Task;
	1240042: ISheetData_Activity_Task;
	22060501: ISheetData_Activity_Task;
	22060502: ISheetData_Activity_Task;
	22060503: ISheetData_Activity_Task;
	22060504: ISheetData_Activity_Task;
	22060505: ISheetData_Activity_Task;
	22060506: ISheetData_Activity_Task;
	22060507: ISheetData_Activity_Task;
	22060508: ISheetData_Activity_Task;
	22060509: ISheetData_Activity_Task;
	22060510: ISheetData_Activity_Task;
	22060511: ISheetData_Activity_Task;
	22060512: ISheetData_Activity_Task;
	22060513: ISheetData_Activity_Task;
	22060514: ISheetData_Activity_Task;
	22060515: ISheetData_Activity_Task;
	22060516: ISheetData_Activity_Task;
	22060517: ISheetData_Activity_Task;
	22060518: ISheetData_Activity_Task;
	22060519: ISheetData_Activity_Task;
	22060520: ISheetData_Activity_Task;
	22060521: ISheetData_Activity_Task;
	22060522: ISheetData_Activity_Task;
	22060523: ISheetData_Activity_Task;
	22060524: ISheetData_Activity_Task;
	22060525: ISheetData_Activity_Task;
	22060526: ISheetData_Activity_Task;
	22060527: ISheetData_Activity_Task;
	22060528: ISheetData_Activity_Task;
	22060529: ISheetData_Activity_Task;
	22060530: ISheetData_Activity_Task;
	22060531: ISheetData_Activity_Task;
	22060532: ISheetData_Activity_Task;
	22060533: ISheetData_Activity_Task;
	22060534: ISheetData_Activity_Task;
	22060535: ISheetData_Activity_Task;
	22060536: ISheetData_Activity_Task;
	22060537: ISheetData_Activity_Task;
	22060538: ISheetData_Activity_Task;
	22060539: ISheetData_Activity_Task;
	22060540: ISheetData_Activity_Task;
	22060541: ISheetData_Activity_Task;
	22060542: ISheetData_Activity_Task;
	22090701: ISheetData_Activity_Task;
	22090702: ISheetData_Activity_Task;
	22090703: ISheetData_Activity_Task;
	22090704: ISheetData_Activity_Task;
	22090705: ISheetData_Activity_Task;
	22090706: ISheetData_Activity_Task;
	22090707: ISheetData_Activity_Task;
	22090708: ISheetData_Activity_Task;
	22090709: ISheetData_Activity_Task;
	22090710: ISheetData_Activity_Task;
	22090711: ISheetData_Activity_Task;
	22090712: ISheetData_Activity_Task;
	22090713: ISheetData_Activity_Task;
	22090714: ISheetData_Activity_Task;
	22090715: ISheetData_Activity_Task;
	22090716: ISheetData_Activity_Task;
	22090717: ISheetData_Activity_Task;
	22090718: ISheetData_Activity_Task;
	22090719: ISheetData_Activity_Task;
	22090720: ISheetData_Activity_Task;
	22090721: ISheetData_Activity_Task;
	22090722: ISheetData_Activity_Task;
	22090723: ISheetData_Activity_Task;
	22090724: ISheetData_Activity_Task;
	22090725: ISheetData_Activity_Task;
	22090726: ISheetData_Activity_Task;
	22090727: ISheetData_Activity_Task;
	22090728: ISheetData_Activity_Task;
	22090729: ISheetData_Activity_Task;
	22090730: ISheetData_Activity_Task;
	22090731: ISheetData_Activity_Task;
	22090732: ISheetData_Activity_Task;
	22090733: ISheetData_Activity_Task;
	22090734: ISheetData_Activity_Task;
	22090735: ISheetData_Activity_Task;
	22090736: ISheetData_Activity_Task;
	22090737: ISheetData_Activity_Task;
	22090738: ISheetData_Activity_Task;
	22090739: ISheetData_Activity_Task;
	22090740: ISheetData_Activity_Task;
	22090741: ISheetData_Activity_Task;
	22090742: ISheetData_Activity_Task;
	23020101: ISheetData_Activity_Task;
	23020102: ISheetData_Activity_Task;
	23020103: ISheetData_Activity_Task;
	23020104: ISheetData_Activity_Task;
	23020105: ISheetData_Activity_Task;
	23020106: ISheetData_Activity_Task;
	23020107: ISheetData_Activity_Task;
	23020108: ISheetData_Activity_Task;
	23020109: ISheetData_Activity_Task;
	23020110: ISheetData_Activity_Task;
	23020111: ISheetData_Activity_Task;
	23020112: ISheetData_Activity_Task;
	23020113: ISheetData_Activity_Task;
	23020114: ISheetData_Activity_Task;
	23020115: ISheetData_Activity_Task;
	23020116: ISheetData_Activity_Task;
	23020117: ISheetData_Activity_Task;
	23020118: ISheetData_Activity_Task;
	23020119: ISheetData_Activity_Task;
	23020120: ISheetData_Activity_Task;
	23020121: ISheetData_Activity_Task;
	23020122: ISheetData_Activity_Task;
	23020123: ISheetData_Activity_Task;
	23020124: ISheetData_Activity_Task;
	23020125: ISheetData_Activity_Task;
	23020126: ISheetData_Activity_Task;
	23020127: ISheetData_Activity_Task;
	23020128: ISheetData_Activity_Task;
	23020129: ISheetData_Activity_Task;
	23020130: ISheetData_Activity_Task;
	23020131: ISheetData_Activity_Task;
	23020132: ISheetData_Activity_Task;
	23020133: ISheetData_Activity_Task;
	23020134: ISheetData_Activity_Task;
	23020135: ISheetData_Activity_Task;
	23020136: ISheetData_Activity_Task;
	23020137: ISheetData_Activity_Task;
	23020138: ISheetData_Activity_Task;
	23020139: ISheetData_Activity_Task;
	23020140: ISheetData_Activity_Task;
	23020141: ISheetData_Activity_Task;
	23020142: ISheetData_Activity_Task;
	23090101: ISheetData_Activity_Task;
	23090102: ISheetData_Activity_Task;
	23090103: ISheetData_Activity_Task;
	23090104: ISheetData_Activity_Task;
	23090105: ISheetData_Activity_Task;
	23090106: ISheetData_Activity_Task;
	23090107: ISheetData_Activity_Task;
	23090108: ISheetData_Activity_Task;
	23090109: ISheetData_Activity_Task;
	23090110: ISheetData_Activity_Task;
	23090111: ISheetData_Activity_Task;
	23090112: ISheetData_Activity_Task;
	23090113: ISheetData_Activity_Task;
	23090114: ISheetData_Activity_Task;
	23090115: ISheetData_Activity_Task;
	23090116: ISheetData_Activity_Task;
	23090117: ISheetData_Activity_Task;
	23090118: ISheetData_Activity_Task;
	23090119: ISheetData_Activity_Task;
	23090120: ISheetData_Activity_Task;
	23090121: ISheetData_Activity_Task;
	23090122: ISheetData_Activity_Task;
	23090123: ISheetData_Activity_Task;
	23090124: ISheetData_Activity_Task;
	23090125: ISheetData_Activity_Task;
	23090126: ISheetData_Activity_Task;
	23090127: ISheetData_Activity_Task;
	23090128: ISheetData_Activity_Task;
	23090129: ISheetData_Activity_Task;
	23090130: ISheetData_Activity_Task;
	23090131: ISheetData_Activity_Task;
	23090132: ISheetData_Activity_Task;
	23090133: ISheetData_Activity_Task;
	23090134: ISheetData_Activity_Task;
	23090135: ISheetData_Activity_Task;
	23090136: ISheetData_Activity_Task;
	23090137: ISheetData_Activity_Task;
	23090138: ISheetData_Activity_Task;
	23090139: ISheetData_Activity_Task;
	23090140: ISheetData_Activity_Task;
	23090141: ISheetData_Activity_Task;
	23090142: ISheetData_Activity_Task;
	24010201: ISheetData_Activity_Task;
	24010202: ISheetData_Activity_Task;
	24010203: ISheetData_Activity_Task;
	24010204: ISheetData_Activity_Task;
	24010205: ISheetData_Activity_Task;
	24010206: ISheetData_Activity_Task;
	24010207: ISheetData_Activity_Task;
	24010208: ISheetData_Activity_Task;
	24010209: ISheetData_Activity_Task;
	24010210: ISheetData_Activity_Task;
	24010211: ISheetData_Activity_Task;
	24010212: ISheetData_Activity_Task;
	24010213: ISheetData_Activity_Task;
	24010214: ISheetData_Activity_Task;
	24010215: ISheetData_Activity_Task;
	24010216: ISheetData_Activity_Task;
	24010217: ISheetData_Activity_Task;
	24010218: ISheetData_Activity_Task;
	24010219: ISheetData_Activity_Task;
	24010220: ISheetData_Activity_Task;
	24010221: ISheetData_Activity_Task;
	24010222: ISheetData_Activity_Task;
	24010223: ISheetData_Activity_Task;
	24010224: ISheetData_Activity_Task;
	24010225: ISheetData_Activity_Task;
	24010226: ISheetData_Activity_Task;
	24010227: ISheetData_Activity_Task;
	24010228: ISheetData_Activity_Task;
	24010229: ISheetData_Activity_Task;
	24010230: ISheetData_Activity_Task;
	24010231: ISheetData_Activity_Task;
	24010232: ISheetData_Activity_Task;
	24010233: ISheetData_Activity_Task;
	24010234: ISheetData_Activity_Task;
	24010235: ISheetData_Activity_Task;
	24010236: ISheetData_Activity_Task;
	24010237: ISheetData_Activity_Task;
	24010238: ISheetData_Activity_Task;
	24010239: ISheetData_Activity_Task;
	24010240: ISheetData_Activity_Task;
	24010241: ISheetData_Activity_Task;
	24010242: ISheetData_Activity_Task;
	24010243: ISheetData_Activity_Task;
	24010244: ISheetData_Activity_Task;
	24010245: ISheetData_Activity_Task;
	24010246: ISheetData_Activity_Task;
	24010247: ISheetData_Activity_Task;
	24010248: ISheetData_Activity_Task;
	24010249: ISheetData_Activity_Task;
	24010250: ISheetData_Activity_Task;
	24010251: ISheetData_Activity_Task;
	24010252: ISheetData_Activity_Task;
	24010253: ISheetData_Activity_Task;
	24010254: ISheetData_Activity_Task;
	24010255: ISheetData_Activity_Task;
	24010256: ISheetData_Activity_Task;
	24010257: ISheetData_Activity_Task;
	24010258: ISheetData_Activity_Task;
	24010259: ISheetData_Activity_Task;
	24010260: ISheetData_Activity_Task;
	24060201: ISheetData_Activity_Task;
	24060202: ISheetData_Activity_Task;
	24060203: ISheetData_Activity_Task;
	24060204: ISheetData_Activity_Task;
	24060205: ISheetData_Activity_Task;
	24060206: ISheetData_Activity_Task;
	24060207: ISheetData_Activity_Task;
	24060208: ISheetData_Activity_Task;
	24060209: ISheetData_Activity_Task;
	24060210: ISheetData_Activity_Task;
	24060211: ISheetData_Activity_Task;
	24060212: ISheetData_Activity_Task;
	24060213: ISheetData_Activity_Task;
	24060214: ISheetData_Activity_Task;
	24060215: ISheetData_Activity_Task;
	24060216: ISheetData_Activity_Task;
	24060217: ISheetData_Activity_Task;
	24060218: ISheetData_Activity_Task;
	24060219: ISheetData_Activity_Task;
	24060220: ISheetData_Activity_Task;
	24060221: ISheetData_Activity_Task;
	24060222: ISheetData_Activity_Task;
	24060223: ISheetData_Activity_Task;
	24060224: ISheetData_Activity_Task;
	24060225: ISheetData_Activity_Task;
	24060226: ISheetData_Activity_Task;
	24060227: ISheetData_Activity_Task;
	24060228: ISheetData_Activity_Task;
	24060229: ISheetData_Activity_Task;
	24060230: ISheetData_Activity_Task;
	24060231: ISheetData_Activity_Task;
	24060232: ISheetData_Activity_Task;
	24060233: ISheetData_Activity_Task;
	24060234: ISheetData_Activity_Task;
	24060235: ISheetData_Activity_Task;
	24060236: ISheetData_Activity_Task;
	24060237: ISheetData_Activity_Task;
	24060238: ISheetData_Activity_Task;
	24060239: ISheetData_Activity_Task;
	24060240: ISheetData_Activity_Task;
	24060241: ISheetData_Activity_Task;
	24060242: ISheetData_Activity_Task;
	24060243: ISheetData_Activity_Task;
	24060244: ISheetData_Activity_Task;
	24060245: ISheetData_Activity_Task;
	24060246: ISheetData_Activity_Task;
	24060247: ISheetData_Activity_Task;
	24060248: ISheetData_Activity_Task;
	24060249: ISheetData_Activity_Task;
	24060250: ISheetData_Activity_Task;
	24060251: ISheetData_Activity_Task;
	24060252: ISheetData_Activity_Task;
	24060253: ISheetData_Activity_Task;
	24060254: ISheetData_Activity_Task;
	24060255: ISheetData_Activity_Task;
	24060256: ISheetData_Activity_Task;
	24060257: ISheetData_Activity_Task;
	24060258: ISheetData_Activity_Task;
	24060259: ISheetData_Activity_Task;
	24060260: ISheetData_Activity_Task;
	24060261: ISheetData_Activity_Task;
	24060262: ISheetData_Activity_Task;
	24060263: ISheetData_Activity_Task;
	24070101: ISheetData_Activity_Task;
	24070102: ISheetData_Activity_Task;
	24070103: ISheetData_Activity_Task;
	24070104: ISheetData_Activity_Task;
	24070105: ISheetData_Activity_Task;
	24070106: ISheetData_Activity_Task;
	24070107: ISheetData_Activity_Task;
	24070108: ISheetData_Activity_Task;
	24070109: ISheetData_Activity_Task;
	24070110: ISheetData_Activity_Task;
	24070111: ISheetData_Activity_Task;
	24070112: ISheetData_Activity_Task;
	24070113: ISheetData_Activity_Task;
	24070114: ISheetData_Activity_Task;
	24070115: ISheetData_Activity_Task;
	24070116: ISheetData_Activity_Task;
	24070117: ISheetData_Activity_Task;
	24070118: ISheetData_Activity_Task;
	24070119: ISheetData_Activity_Task;
	24070120: ISheetData_Activity_Task;
	24070121: ISheetData_Activity_Task;
	24070122: ISheetData_Activity_Task;
	24070123: ISheetData_Activity_Task;
	24070124: ISheetData_Activity_Task;
	24070125: ISheetData_Activity_Task;
	24070126: ISheetData_Activity_Task;
	24070127: ISheetData_Activity_Task;
	24070128: ISheetData_Activity_Task;
	24070129: ISheetData_Activity_Task;
	24070130: ISheetData_Activity_Task;
	24070131: ISheetData_Activity_Task;
	24070132: ISheetData_Activity_Task;
	24070133: ISheetData_Activity_Task;
	24070134: ISheetData_Activity_Task;
	24070135: ISheetData_Activity_Task;
	24070136: ISheetData_Activity_Task;
	24070137: ISheetData_Activity_Task;
	24070138: ISheetData_Activity_Task;
	24070139: ISheetData_Activity_Task;
	24070140: ISheetData_Activity_Task;
	24070141: ISheetData_Activity_Task;
	24070142: ISheetData_Activity_Task;
	25020101: ISheetData_Activity_Task;
	25020102: ISheetData_Activity_Task;
	25020103: ISheetData_Activity_Task;
	25020104: ISheetData_Activity_Task;
	25020105: ISheetData_Activity_Task;
	25020106: ISheetData_Activity_Task;
	25020107: ISheetData_Activity_Task;
	25020108: ISheetData_Activity_Task;
	25020109: ISheetData_Activity_Task;
	25020110: ISheetData_Activity_Task;
	25020111: ISheetData_Activity_Task;
	25020112: ISheetData_Activity_Task;
	25020113: ISheetData_Activity_Task;
	25020114: ISheetData_Activity_Task;
	25020115: ISheetData_Activity_Task;
	25020116: ISheetData_Activity_Task;
	25020117: ISheetData_Activity_Task;
	25020118: ISheetData_Activity_Task;
	25020119: ISheetData_Activity_Task;
	25020120: ISheetData_Activity_Task;
	25020121: ISheetData_Activity_Task;
	25020122: ISheetData_Activity_Task;
	25020123: ISheetData_Activity_Task;
	25020124: ISheetData_Activity_Task;
	25020125: ISheetData_Activity_Task;
	25020126: ISheetData_Activity_Task;
	25020127: ISheetData_Activity_Task;
	25020128: ISheetData_Activity_Task;
	25020129: ISheetData_Activity_Task;
	25020130: ISheetData_Activity_Task;
	25020131: ISheetData_Activity_Task;
	25020132: ISheetData_Activity_Task;
	25020133: ISheetData_Activity_Task;
	25020134: ISheetData_Activity_Task;
	25020135: ISheetData_Activity_Task;
	25020136: ISheetData_Activity_Task;
	25020137: ISheetData_Activity_Task;
	25020138: ISheetData_Activity_Task;
	25020139: ISheetData_Activity_Task;
	25020140: ISheetData_Activity_Task;
	25020141: ISheetData_Activity_Task;
	25020142: ISheetData_Activity_Task;
	25090101: ISheetData_Activity_Task;
	25090102: ISheetData_Activity_Task;
	25090103: ISheetData_Activity_Task;
	25090104: ISheetData_Activity_Task;
	25090105: ISheetData_Activity_Task;
	25090106: ISheetData_Activity_Task;
	25090107: ISheetData_Activity_Task;
	25090108: ISheetData_Activity_Task;
	25090109: ISheetData_Activity_Task;
	25090110: ISheetData_Activity_Task;
	25090111: ISheetData_Activity_Task;
	25090112: ISheetData_Activity_Task;
	25090113: ISheetData_Activity_Task;
	25090114: ISheetData_Activity_Task;
	25090115: ISheetData_Activity_Task;
	25090116: ISheetData_Activity_Task;
	25090117: ISheetData_Activity_Task;
	25090118: ISheetData_Activity_Task;
	25090119: ISheetData_Activity_Task;
	25090120: ISheetData_Activity_Task;
	25090121: ISheetData_Activity_Task;
	25090122: ISheetData_Activity_Task;
	25090123: ISheetData_Activity_Task;
	25090124: ISheetData_Activity_Task;
	25090125: ISheetData_Activity_Task;
	25090126: ISheetData_Activity_Task;
	25090127: ISheetData_Activity_Task;
	25090128: ISheetData_Activity_Task;
	25090129: ISheetData_Activity_Task;
	25090130: ISheetData_Activity_Task;
	25090131: ISheetData_Activity_Task;
	25090132: ISheetData_Activity_Task;
	25090133: ISheetData_Activity_Task;
	25090134: ISheetData_Activity_Task;
	25090135: ISheetData_Activity_Task;
	25090136: ISheetData_Activity_Task;
	25090137: ISheetData_Activity_Task;
	25090138: ISheetData_Activity_Task;
	25090139: ISheetData_Activity_Task;
	25090140: ISheetData_Activity_Task;
	25090141: ISheetData_Activity_Task;
	25090142: ISheetData_Activity_Task;
	25090143: ISheetData_Activity_Task;
	25090144: ISheetData_Activity_Task;
	25090145: ISheetData_Activity_Task;
	25090146: ISheetData_Activity_Task;
	25090147: ISheetData_Activity_Task;
	25090148: ISheetData_Activity_Task;
}
declare interface ISheetData_Activity_Task {
	/** 活动任务id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 自活动开始的天数 */
	day: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
	/** 隐藏奖励 */
	hidden_reward: string;
	/** 限制ID source_limit表 */
	limit_id: number;
	/** 维护用字段，将任务转变为不可见不可领状态 */
	deprecated: number;
}
//#endregion

//#region exchange --- unique
declare interface ISheet_Activity_Exchange {
	rows: ISheetData_Activity_Exchange[];
	1002001: ISheetData_Activity_Exchange;
	1002002: ISheetData_Activity_Exchange;
	1002003: ISheetData_Activity_Exchange;
	1002004: ISheetData_Activity_Exchange;
	1002005: ISheetData_Activity_Exchange;
	1002006: ISheetData_Activity_Exchange;
	1002007: ISheetData_Activity_Exchange;
	1002008: ISheetData_Activity_Exchange;
	1002009: ISheetData_Activity_Exchange;
	1002010: ISheetData_Activity_Exchange;
	1005001: ISheetData_Activity_Exchange;
	1005002: ISheetData_Activity_Exchange;
	1005003: ISheetData_Activity_Exchange;
	1005004: ISheetData_Activity_Exchange;
	1005005: ISheetData_Activity_Exchange;
	1005006: ISheetData_Activity_Exchange;
	1005007: ISheetData_Activity_Exchange;
	1005008: ISheetData_Activity_Exchange;
	1005009: ISheetData_Activity_Exchange;
	1005010: ISheetData_Activity_Exchange;
	1005011: ISheetData_Activity_Exchange;
	1005012: ISheetData_Activity_Exchange;
	1005013: ISheetData_Activity_Exchange;
	1005014: ISheetData_Activity_Exchange;
	1005015: ISheetData_Activity_Exchange;
	1005016: ISheetData_Activity_Exchange;
	1005017: ISheetData_Activity_Exchange;
	1005018: ISheetData_Activity_Exchange;
	1005019: ISheetData_Activity_Exchange;
	1007001: ISheetData_Activity_Exchange;
	1007002: ISheetData_Activity_Exchange;
	1007003: ISheetData_Activity_Exchange;
	1007004: ISheetData_Activity_Exchange;
	1007005: ISheetData_Activity_Exchange;
	1007009: ISheetData_Activity_Exchange;
	1007010: ISheetData_Activity_Exchange;
	1007013: ISheetData_Activity_Exchange;
	1013001: ISheetData_Activity_Exchange;
	1013002: ISheetData_Activity_Exchange;
	1013003: ISheetData_Activity_Exchange;
	1013004: ISheetData_Activity_Exchange;
	1013005: ISheetData_Activity_Exchange;
	1013006: ISheetData_Activity_Exchange;
	1013007: ISheetData_Activity_Exchange;
	1013008: ISheetData_Activity_Exchange;
	1013009: ISheetData_Activity_Exchange;
	1013010: ISheetData_Activity_Exchange;
	1013011: ISheetData_Activity_Exchange;
	1013012: ISheetData_Activity_Exchange;
	1013013: ISheetData_Activity_Exchange;
	1019001: ISheetData_Activity_Exchange;
	1019002: ISheetData_Activity_Exchange;
	1019003: ISheetData_Activity_Exchange;
	1019004: ISheetData_Activity_Exchange;
	1019005: ISheetData_Activity_Exchange;
	1019006: ISheetData_Activity_Exchange;
	1019007: ISheetData_Activity_Exchange;
	1019008: ISheetData_Activity_Exchange;
	1019009: ISheetData_Activity_Exchange;
	1019010: ISheetData_Activity_Exchange;
	1025001: ISheetData_Activity_Exchange;
	1025002: ISheetData_Activity_Exchange;
	1025003: ISheetData_Activity_Exchange;
	1025004: ISheetData_Activity_Exchange;
	1025005: ISheetData_Activity_Exchange;
	1025006: ISheetData_Activity_Exchange;
	1025007: ISheetData_Activity_Exchange;
	1025008: ISheetData_Activity_Exchange;
	1025009: ISheetData_Activity_Exchange;
	1025010: ISheetData_Activity_Exchange;
	1025011: ISheetData_Activity_Exchange;
	1025012: ISheetData_Activity_Exchange;
	1025013: ISheetData_Activity_Exchange;
	1032001: ISheetData_Activity_Exchange;
	1032002: ISheetData_Activity_Exchange;
	1032003: ISheetData_Activity_Exchange;
	1032004: ISheetData_Activity_Exchange;
	1032005: ISheetData_Activity_Exchange;
	1032006: ISheetData_Activity_Exchange;
	1032007: ISheetData_Activity_Exchange;
	1032008: ISheetData_Activity_Exchange;
	1032009: ISheetData_Activity_Exchange;
	1035001: ISheetData_Activity_Exchange;
	1035002: ISheetData_Activity_Exchange;
	1035003: ISheetData_Activity_Exchange;
	1035004: ISheetData_Activity_Exchange;
	1035005: ISheetData_Activity_Exchange;
	1035006: ISheetData_Activity_Exchange;
	1035007: ISheetData_Activity_Exchange;
	1035008: ISheetData_Activity_Exchange;
	1035009: ISheetData_Activity_Exchange;
	1035010: ISheetData_Activity_Exchange;
	1035011: ISheetData_Activity_Exchange;
	1035012: ISheetData_Activity_Exchange;
	1035013: ISheetData_Activity_Exchange;
	1035014: ISheetData_Activity_Exchange;
	1035015: ISheetData_Activity_Exchange;
	1035016: ISheetData_Activity_Exchange;
	1035017: ISheetData_Activity_Exchange;
	1035018: ISheetData_Activity_Exchange;
	1035019: ISheetData_Activity_Exchange;
	1035020: ISheetData_Activity_Exchange;
	1035021: ISheetData_Activity_Exchange;
	1035022: ISheetData_Activity_Exchange;
	1035023: ISheetData_Activity_Exchange;
	1063001: ISheetData_Activity_Exchange;
	1063002: ISheetData_Activity_Exchange;
	1063003: ISheetData_Activity_Exchange;
	1063004: ISheetData_Activity_Exchange;
	1063005: ISheetData_Activity_Exchange;
	1063006: ISheetData_Activity_Exchange;
	1063007: ISheetData_Activity_Exchange;
	1063008: ISheetData_Activity_Exchange;
	1063009: ISheetData_Activity_Exchange;
	1063010: ISheetData_Activity_Exchange;
	1081001: ISheetData_Activity_Exchange;
	1081002: ISheetData_Activity_Exchange;
	1081003: ISheetData_Activity_Exchange;
	1081004: ISheetData_Activity_Exchange;
	1081005: ISheetData_Activity_Exchange;
	1081006: ISheetData_Activity_Exchange;
	1081007: ISheetData_Activity_Exchange;
	1081008: ISheetData_Activity_Exchange;
	1081009: ISheetData_Activity_Exchange;
	1081010: ISheetData_Activity_Exchange;
	1085001: ISheetData_Activity_Exchange;
	1085002: ISheetData_Activity_Exchange;
	1085003: ISheetData_Activity_Exchange;
	1085004: ISheetData_Activity_Exchange;
	1085005: ISheetData_Activity_Exchange;
	1085006: ISheetData_Activity_Exchange;
	1085007: ISheetData_Activity_Exchange;
	1085008: ISheetData_Activity_Exchange;
	1085009: ISheetData_Activity_Exchange;
	1097001: ISheetData_Activity_Exchange;
	1097002: ISheetData_Activity_Exchange;
	1097003: ISheetData_Activity_Exchange;
	1097004: ISheetData_Activity_Exchange;
	1097005: ISheetData_Activity_Exchange;
	1097006: ISheetData_Activity_Exchange;
	1097007: ISheetData_Activity_Exchange;
	1097008: ISheetData_Activity_Exchange;
	1097009: ISheetData_Activity_Exchange;
	1097010: ISheetData_Activity_Exchange;
	1097011: ISheetData_Activity_Exchange;
	1097012: ISheetData_Activity_Exchange;
	1108001: ISheetData_Activity_Exchange;
	1108002: ISheetData_Activity_Exchange;
	1108003: ISheetData_Activity_Exchange;
	1108004: ISheetData_Activity_Exchange;
	1108005: ISheetData_Activity_Exchange;
	1108006: ISheetData_Activity_Exchange;
	1108007: ISheetData_Activity_Exchange;
	1108008: ISheetData_Activity_Exchange;
	1108009: ISheetData_Activity_Exchange;
	1108010: ISheetData_Activity_Exchange;
	1108011: ISheetData_Activity_Exchange;
	1108012: ISheetData_Activity_Exchange;
	1108013: ISheetData_Activity_Exchange;
	1168001: ISheetData_Activity_Exchange;
	1168002: ISheetData_Activity_Exchange;
	1168003: ISheetData_Activity_Exchange;
	1168004: ISheetData_Activity_Exchange;
	1168005: ISheetData_Activity_Exchange;
	1168006: ISheetData_Activity_Exchange;
	1168007: ISheetData_Activity_Exchange;
	1168008: ISheetData_Activity_Exchange;
	1168009: ISheetData_Activity_Exchange;
	1168010: ISheetData_Activity_Exchange;
	1168011: ISheetData_Activity_Exchange;
	1168012: ISheetData_Activity_Exchange;
	1168013: ISheetData_Activity_Exchange;
	1168014: ISheetData_Activity_Exchange;
	1204001: ISheetData_Activity_Exchange;
	1204002: ISheetData_Activity_Exchange;
	1204003: ISheetData_Activity_Exchange;
	1204004: ISheetData_Activity_Exchange;
	1204005: ISheetData_Activity_Exchange;
	1204006: ISheetData_Activity_Exchange;
	1204007: ISheetData_Activity_Exchange;
	1204008: ISheetData_Activity_Exchange;
	1204009: ISheetData_Activity_Exchange;
	1204010: ISheetData_Activity_Exchange;
	1204011: ISheetData_Activity_Exchange;
	1204012: ISheetData_Activity_Exchange;
	1221001: ISheetData_Activity_Exchange;
	1221002: ISheetData_Activity_Exchange;
	1221003: ISheetData_Activity_Exchange;
	1221004: ISheetData_Activity_Exchange;
	1221005: ISheetData_Activity_Exchange;
	1221006: ISheetData_Activity_Exchange;
	1221007: ISheetData_Activity_Exchange;
	1221008: ISheetData_Activity_Exchange;
	1221009: ISheetData_Activity_Exchange;
	1221010: ISheetData_Activity_Exchange;
	1221011: ISheetData_Activity_Exchange;
	1221012: ISheetData_Activity_Exchange;
	1221013: ISheetData_Activity_Exchange;
	1221014: ISheetData_Activity_Exchange;
	1221015: ISheetData_Activity_Exchange;
	1241001: ISheetData_Activity_Exchange;
	1241002: ISheetData_Activity_Exchange;
	1241003: ISheetData_Activity_Exchange;
	1241004: ISheetData_Activity_Exchange;
	1241005: ISheetData_Activity_Exchange;
	1241006: ISheetData_Activity_Exchange;
	1241007: ISheetData_Activity_Exchange;
	1241008: ISheetData_Activity_Exchange;
	1241009: ISheetData_Activity_Exchange;
	1241010: ISheetData_Activity_Exchange;
	1241011: ISheetData_Activity_Exchange;
	1241012: ISheetData_Activity_Exchange;
	22030601: ISheetData_Activity_Exchange;
	22030602: ISheetData_Activity_Exchange;
	22030603: ISheetData_Activity_Exchange;
	22030604: ISheetData_Activity_Exchange;
	22030605: ISheetData_Activity_Exchange;
	22030606: ISheetData_Activity_Exchange;
	22030607: ISheetData_Activity_Exchange;
	22030608: ISheetData_Activity_Exchange;
	22030609: ISheetData_Activity_Exchange;
	22030610: ISheetData_Activity_Exchange;
	22030611: ISheetData_Activity_Exchange;
	22030612: ISheetData_Activity_Exchange;
	22030613: ISheetData_Activity_Exchange;
	22030614: ISheetData_Activity_Exchange;
	22030615: ISheetData_Activity_Exchange;
	22060601: ISheetData_Activity_Exchange;
	22060602: ISheetData_Activity_Exchange;
	22060603: ISheetData_Activity_Exchange;
	22060604: ISheetData_Activity_Exchange;
	22060605: ISheetData_Activity_Exchange;
	22060606: ISheetData_Activity_Exchange;
	22060607: ISheetData_Activity_Exchange;
	22060608: ISheetData_Activity_Exchange;
	22060609: ISheetData_Activity_Exchange;
	22060610: ISheetData_Activity_Exchange;
	22060611: ISheetData_Activity_Exchange;
	22060612: ISheetData_Activity_Exchange;
	22070601: ISheetData_Activity_Exchange;
	22070602: ISheetData_Activity_Exchange;
	22070603: ISheetData_Activity_Exchange;
	22070604: ISheetData_Activity_Exchange;
	22070605: ISheetData_Activity_Exchange;
	22070606: ISheetData_Activity_Exchange;
	22070607: ISheetData_Activity_Exchange;
	22070608: ISheetData_Activity_Exchange;
	22070609: ISheetData_Activity_Exchange;
	22070610: ISheetData_Activity_Exchange;
	22070611: ISheetData_Activity_Exchange;
	22070612: ISheetData_Activity_Exchange;
	22070613: ISheetData_Activity_Exchange;
	22070614: ISheetData_Activity_Exchange;
	22070615: ISheetData_Activity_Exchange;
	22090801: ISheetData_Activity_Exchange;
	22090802: ISheetData_Activity_Exchange;
	22090803: ISheetData_Activity_Exchange;
	22090804: ISheetData_Activity_Exchange;
	22090805: ISheetData_Activity_Exchange;
	22090806: ISheetData_Activity_Exchange;
	22090807: ISheetData_Activity_Exchange;
	22090808: ISheetData_Activity_Exchange;
	22090809: ISheetData_Activity_Exchange;
	22090810: ISheetData_Activity_Exchange;
	22090811: ISheetData_Activity_Exchange;
	22090812: ISheetData_Activity_Exchange;
	23020201: ISheetData_Activity_Exchange;
	23020202: ISheetData_Activity_Exchange;
	23020203: ISheetData_Activity_Exchange;
	23020204: ISheetData_Activity_Exchange;
	23020205: ISheetData_Activity_Exchange;
	23020206: ISheetData_Activity_Exchange;
	23020207: ISheetData_Activity_Exchange;
	23020208: ISheetData_Activity_Exchange;
	23020209: ISheetData_Activity_Exchange;
	23020210: ISheetData_Activity_Exchange;
	23020211: ISheetData_Activity_Exchange;
	23020212: ISheetData_Activity_Exchange;
	23020213: ISheetData_Activity_Exchange;
	23060301: ISheetData_Activity_Exchange;
	23060302: ISheetData_Activity_Exchange;
	23060303: ISheetData_Activity_Exchange;
	23060304: ISheetData_Activity_Exchange;
	23060305: ISheetData_Activity_Exchange;
	23060306: ISheetData_Activity_Exchange;
	23060307: ISheetData_Activity_Exchange;
	23060308: ISheetData_Activity_Exchange;
	23060309: ISheetData_Activity_Exchange;
	23060310: ISheetData_Activity_Exchange;
	23060311: ISheetData_Activity_Exchange;
	23060312: ISheetData_Activity_Exchange;
	23060313: ISheetData_Activity_Exchange;
	23060314: ISheetData_Activity_Exchange;
	23060315: ISheetData_Activity_Exchange;
	23060316: ISheetData_Activity_Exchange;
	23060317: ISheetData_Activity_Exchange;
	23090201: ISheetData_Activity_Exchange;
	23090202: ISheetData_Activity_Exchange;
	23090203: ISheetData_Activity_Exchange;
	23090204: ISheetData_Activity_Exchange;
	23090205: ISheetData_Activity_Exchange;
	23090206: ISheetData_Activity_Exchange;
	23090207: ISheetData_Activity_Exchange;
	23090208: ISheetData_Activity_Exchange;
	23090209: ISheetData_Activity_Exchange;
	23090210: ISheetData_Activity_Exchange;
	23090211: ISheetData_Activity_Exchange;
	23090212: ISheetData_Activity_Exchange;
	23090213: ISheetData_Activity_Exchange;
	23090214: ISheetData_Activity_Exchange;
	24030301: ISheetData_Activity_Exchange;
	24030302: ISheetData_Activity_Exchange;
	24030303: ISheetData_Activity_Exchange;
	24030304: ISheetData_Activity_Exchange;
	24050301: ISheetData_Activity_Exchange;
	24050303: ISheetData_Activity_Exchange;
	24050304: ISheetData_Activity_Exchange;
	24050305: ISheetData_Activity_Exchange;
	24050306: ISheetData_Activity_Exchange;
	24050307: ISheetData_Activity_Exchange;
	24050308: ISheetData_Activity_Exchange;
	24050309: ISheetData_Activity_Exchange;
	24050310: ISheetData_Activity_Exchange;
	24050311: ISheetData_Activity_Exchange;
	24050312: ISheetData_Activity_Exchange;
	24050313: ISheetData_Activity_Exchange;
	24050314: ISheetData_Activity_Exchange;
	24050315: ISheetData_Activity_Exchange;
	24050316: ISheetData_Activity_Exchange;
	24050317: ISheetData_Activity_Exchange;
	24081401: ISheetData_Activity_Exchange;
	24081402: ISheetData_Activity_Exchange;
	24081403: ISheetData_Activity_Exchange;
	24081404: ISheetData_Activity_Exchange;
	25030201: ISheetData_Activity_Exchange;
	25030202: ISheetData_Activity_Exchange;
	25030203: ISheetData_Activity_Exchange;
	25030204: ISheetData_Activity_Exchange;
	25030205: ISheetData_Activity_Exchange;
	25030206: ISheetData_Activity_Exchange;
	25030207: ISheetData_Activity_Exchange;
	25030208: ISheetData_Activity_Exchange;
	25030209: ISheetData_Activity_Exchange;
	25030210: ISheetData_Activity_Exchange;
	25030211: ISheetData_Activity_Exchange;
	25030212: ISheetData_Activity_Exchange;
	25030213: ISheetData_Activity_Exchange;
	25030214: ISheetData_Activity_Exchange;
	25030215: ISheetData_Activity_Exchange;
	25030216: ISheetData_Activity_Exchange;
}
declare interface ISheetData_Activity_Exchange {
	/** 兑换id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 奖励id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
	/** 消耗id */
	consume_id: number;
	/** 消耗数量 */
	consume_count: number;
	/** 兑换次数限制 */
	exchange_limit: number;
	/** 兑换限制道具id */
	item_limit_id: number;
	/** 已有超过/等于数量的物品就不能兑换 */
	item_limit_count: number;
	/** 解锁时间 */
	unlock_day: string;
}
//#endregion

//#region chest_up --- group
declare interface ISheet_Activity_ChestUp {
	rows: ISheetData_Activity_ChestUp[];
	1003: ISheetData_Activity_ChestUp[];
	1008: ISheetData_Activity_ChestUp[];
	1015: ISheetData_Activity_ChestUp[];
	1016: ISheetData_Activity_ChestUp[];
	1017: ISheetData_Activity_ChestUp[];
	1026: ISheetData_Activity_ChestUp[];
	1027: ISheetData_Activity_ChestUp[];
	1030: ISheetData_Activity_ChestUp[];
	1033: ISheetData_Activity_ChestUp[];
	1034: ISheetData_Activity_ChestUp[];
	1039: ISheetData_Activity_ChestUp[];
	1040: ISheetData_Activity_ChestUp[];
	1041: ISheetData_Activity_ChestUp[];
	1042: ISheetData_Activity_ChestUp[];
	1043: ISheetData_Activity_ChestUp[];
	1044: ISheetData_Activity_ChestUp[];
	1045: ISheetData_Activity_ChestUp[];
	1046: ISheetData_Activity_ChestUp[];
	1047: ISheetData_Activity_ChestUp[];
	1048: ISheetData_Activity_ChestUp[];
	1049: ISheetData_Activity_ChestUp[];
	1050: ISheetData_Activity_ChestUp[];
	1051: ISheetData_Activity_ChestUp[];
	1052: ISheetData_Activity_ChestUp[];
	1053: ISheetData_Activity_ChestUp[];
	1054: ISheetData_Activity_ChestUp[];
	1055: ISheetData_Activity_ChestUp[];
	1056: ISheetData_Activity_ChestUp[];
	1057: ISheetData_Activity_ChestUp[];
	1058: ISheetData_Activity_ChestUp[];
	1068: ISheetData_Activity_ChestUp[];
	1069: ISheetData_Activity_ChestUp[];
	1071: ISheetData_Activity_ChestUp[];
	1072: ISheetData_Activity_ChestUp[];
	1082: ISheetData_Activity_ChestUp[];
	1083: ISheetData_Activity_ChestUp[];
	1086: ISheetData_Activity_ChestUp[];
	1087: ISheetData_Activity_ChestUp[];
	1088: ISheetData_Activity_ChestUp[];
	1089: ISheetData_Activity_ChestUp[];
	1098: ISheetData_Activity_ChestUp[];
	1099: ISheetData_Activity_ChestUp[];
	1100: ISheetData_Activity_ChestUp[];
	1101: ISheetData_Activity_ChestUp[];
	1111: ISheetData_Activity_ChestUp[];
	1112: ISheetData_Activity_ChestUp[];
	1113: ISheetData_Activity_ChestUp[];
	1114: ISheetData_Activity_ChestUp[];
	1115: ISheetData_Activity_ChestUp[];
	1116: ISheetData_Activity_ChestUp[];
	1121: ISheetData_Activity_ChestUp[];
	1122: ISheetData_Activity_ChestUp[];
	1123: ISheetData_Activity_ChestUp[];
	1124: ISheetData_Activity_ChestUp[];
	1126: ISheetData_Activity_ChestUp[];
	1127: ISheetData_Activity_ChestUp[];
	1128: ISheetData_Activity_ChestUp[];
	1129: ISheetData_Activity_ChestUp[];
	1130: ISheetData_Activity_ChestUp[];
	1131: ISheetData_Activity_ChestUp[];
	1133: ISheetData_Activity_ChestUp[];
	1137: ISheetData_Activity_ChestUp[];
	1138: ISheetData_Activity_ChestUp[];
	1139: ISheetData_Activity_ChestUp[];
	1140: ISheetData_Activity_ChestUp[];
	1141: ISheetData_Activity_ChestUp[];
	1142: ISheetData_Activity_ChestUp[];
	1143: ISheetData_Activity_ChestUp[];
	1144: ISheetData_Activity_ChestUp[];
	1145: ISheetData_Activity_ChestUp[];
	1146: ISheetData_Activity_ChestUp[];
	1147: ISheetData_Activity_ChestUp[];
	1148: ISheetData_Activity_ChestUp[];
	1149: ISheetData_Activity_ChestUp[];
	1150: ISheetData_Activity_ChestUp[];
	1151: ISheetData_Activity_ChestUp[];
	1152: ISheetData_Activity_ChestUp[];
	1153: ISheetData_Activity_ChestUp[];
	1154: ISheetData_Activity_ChestUp[];
	1155: ISheetData_Activity_ChestUp[];
	1156: ISheetData_Activity_ChestUp[];
	1157: ISheetData_Activity_ChestUp[];
	1158: ISheetData_Activity_ChestUp[];
	1169: ISheetData_Activity_ChestUp[];
	1170: ISheetData_Activity_ChestUp[];
	1171: ISheetData_Activity_ChestUp[];
	1172: ISheetData_Activity_ChestUp[];
	1180: ISheetData_Activity_ChestUp[];
	1183: ISheetData_Activity_ChestUp[];
	1184: ISheetData_Activity_ChestUp[];
	1188: ISheetData_Activity_ChestUp[];
	1189: ISheetData_Activity_ChestUp[];
	1195: ISheetData_Activity_ChestUp[];
	1196: ISheetData_Activity_ChestUp[];
	1197: ISheetData_Activity_ChestUp[];
	1198: ISheetData_Activity_ChestUp[];
	1201: ISheetData_Activity_ChestUp[];
	1202: ISheetData_Activity_ChestUp[];
	1209: ISheetData_Activity_ChestUp[];
	1210: ISheetData_Activity_ChestUp[];
	1211: ISheetData_Activity_ChestUp[];
	1212: ISheetData_Activity_ChestUp[];
	1216: ISheetData_Activity_ChestUp[];
	1217: ISheetData_Activity_ChestUp[];
	1218: ISheetData_Activity_ChestUp[];
	1219: ISheetData_Activity_ChestUp[];
	1229: ISheetData_Activity_ChestUp[];
	1230: ISheetData_Activity_ChestUp[];
	1236: ISheetData_Activity_ChestUp[];
	1237: ISheetData_Activity_ChestUp[];
	1238: ISheetData_Activity_ChestUp[];
	1239: ISheetData_Activity_ChestUp[];
	1249: ISheetData_Activity_ChestUp[];
	1250: ISheetData_Activity_ChestUp[];
	1251: ISheetData_Activity_ChestUp[];
	1252: ISheetData_Activity_ChestUp[];
	1253: ISheetData_Activity_ChestUp[];
	1254: ISheetData_Activity_ChestUp[];
	1255: ISheetData_Activity_ChestUp[];
	1264: ISheetData_Activity_ChestUp[];
	1265: ISheetData_Activity_ChestUp[];
	1266: ISheetData_Activity_ChestUp[];
	1267: ISheetData_Activity_ChestUp[];
	1268: ISheetData_Activity_ChestUp[];
	1269: ISheetData_Activity_ChestUp[];
	1270: ISheetData_Activity_ChestUp[];
	1271: ISheetData_Activity_ChestUp[];
	1272: ISheetData_Activity_ChestUp[];
	1273: ISheetData_Activity_ChestUp[];
	1274: ISheetData_Activity_ChestUp[];
	1275: ISheetData_Activity_ChestUp[];
	1276: ISheetData_Activity_ChestUp[];
	1277: ISheetData_Activity_ChestUp[];
	1278: ISheetData_Activity_ChestUp[];
	1279: ISheetData_Activity_ChestUp[];
	1280: ISheetData_Activity_ChestUp[];
	1281: ISheetData_Activity_ChestUp[];
	1282: ISheetData_Activity_ChestUp[];
	1283: ISheetData_Activity_ChestUp[];
	1284: ISheetData_Activity_ChestUp[];
	1285: ISheetData_Activity_ChestUp[];
	1286: ISheetData_Activity_ChestUp[];
	1287: ISheetData_Activity_ChestUp[];
	1288: ISheetData_Activity_ChestUp[];
	1289: ISheetData_Activity_ChestUp[];
	1290: ISheetData_Activity_ChestUp[];
	1291: ISheetData_Activity_ChestUp[];
	1292: ISheetData_Activity_ChestUp[];
	1293: ISheetData_Activity_ChestUp[];
	1302: ISheetData_Activity_ChestUp[];
	1303: ISheetData_Activity_ChestUp[];
	100000: ISheetData_Activity_ChestUp[];
	100001: ISheetData_Activity_ChestUp[];
	100100: ISheetData_Activity_ChestUp[];
	100101: ISheetData_Activity_ChestUp[];
	220301: ISheetData_Activity_ChestUp[];
	220302: ISheetData_Activity_ChestUp[];
	220303: ISheetData_Activity_ChestUp[];
	220304: ISheetData_Activity_ChestUp[];
	220408: ISheetData_Activity_ChestUp[];
	220411: ISheetData_Activity_ChestUp[];
	220502: ISheetData_Activity_ChestUp[];
	220503: ISheetData_Activity_ChestUp[];
	220504: ISheetData_Activity_ChestUp[];
	220505: ISheetData_Activity_ChestUp[];
	220601: ISheetData_Activity_ChestUp[];
	220602: ISheetData_Activity_ChestUp[];
	220603: ISheetData_Activity_ChestUp[];
	220604: ISheetData_Activity_ChestUp[];
	220701: ISheetData_Activity_ChestUp[];
	220702: ISheetData_Activity_ChestUp[];
	220703: ISheetData_Activity_ChestUp[];
	220704: ISheetData_Activity_ChestUp[];
	220801: ISheetData_Activity_ChestUp[];
	220802: ISheetData_Activity_ChestUp[];
	220803: ISheetData_Activity_ChestUp[];
	220804: ISheetData_Activity_ChestUp[];
	220805: ISheetData_Activity_ChestUp[];
	220903: ISheetData_Activity_ChestUp[];
	220904: ISheetData_Activity_ChestUp[];
	220905: ISheetData_Activity_ChestUp[];
	220906: ISheetData_Activity_ChestUp[];
	221003: ISheetData_Activity_ChestUp[];
	221004: ISheetData_Activity_ChestUp[];
	221109: ISheetData_Activity_ChestUp[];
	221110: ISheetData_Activity_ChestUp[];
	221111: ISheetData_Activity_ChestUp[];
	221112: ISheetData_Activity_ChestUp[];
	221204: ISheetData_Activity_ChestUp[];
	221205: ISheetData_Activity_ChestUp[];
	221206: ISheetData_Activity_ChestUp[];
	221207: ISheetData_Activity_ChestUp[];
	221208: ISheetData_Activity_ChestUp[];
	230106: ISheetData_Activity_ChestUp[];
	230107: ISheetData_Activity_ChestUp[];
	230108: ISheetData_Activity_ChestUp[];
	230109: ISheetData_Activity_ChestUp[];
	230110: ISheetData_Activity_ChestUp[];
	230111: ISheetData_Activity_ChestUp[];
	230112: ISheetData_Activity_ChestUp[];
	230113: ISheetData_Activity_ChestUp[];
	230114: ISheetData_Activity_ChestUp[];
	230115: ISheetData_Activity_ChestUp[];
	230116: ISheetData_Activity_ChestUp[];
	230117: ISheetData_Activity_ChestUp[];
	230118: ISheetData_Activity_ChestUp[];
	230119: ISheetData_Activity_ChestUp[];
	230120: ISheetData_Activity_ChestUp[];
	230121: ISheetData_Activity_ChestUp[];
	230122: ISheetData_Activity_ChestUp[];
	230123: ISheetData_Activity_ChestUp[];
	230124: ISheetData_Activity_ChestUp[];
	230125: ISheetData_Activity_ChestUp[];
	230126: ISheetData_Activity_ChestUp[];
	230127: ISheetData_Activity_ChestUp[];
	230128: ISheetData_Activity_ChestUp[];
	230129: ISheetData_Activity_ChestUp[];
	230130: ISheetData_Activity_ChestUp[];
	230131: ISheetData_Activity_ChestUp[];
	230132: ISheetData_Activity_ChestUp[];
	230133: ISheetData_Activity_ChestUp[];
	230134: ISheetData_Activity_ChestUp[];
	230135: ISheetData_Activity_ChestUp[];
	230136: ISheetData_Activity_ChestUp[];
	230137: ISheetData_Activity_ChestUp[];
	230138: ISheetData_Activity_ChestUp[];
	230139: ISheetData_Activity_ChestUp[];
	230205: ISheetData_Activity_ChestUp[];
	230206: ISheetData_Activity_ChestUp[];
	230207: ISheetData_Activity_ChestUp[];
	230208: ISheetData_Activity_ChestUp[];
	230305: ISheetData_Activity_ChestUp[];
	230306: ISheetData_Activity_ChestUp[];
	230307: ISheetData_Activity_ChestUp[];
	230308: ISheetData_Activity_ChestUp[];
	230410: ISheetData_Activity_ChestUp[];
	230411: ISheetData_Activity_ChestUp[];
	230505: ISheetData_Activity_ChestUp[];
	230506: ISheetData_Activity_ChestUp[];
	230507: ISheetData_Activity_ChestUp[];
	230606: ISheetData_Activity_ChestUp[];
	230607: ISheetData_Activity_ChestUp[];
	230608: ISheetData_Activity_ChestUp[];
	230609: ISheetData_Activity_ChestUp[];
	230610: ISheetData_Activity_ChestUp[];
	230704: ISheetData_Activity_ChestUp[];
	230705: ISheetData_Activity_ChestUp[];
	230706: ISheetData_Activity_ChestUp[];
	230811: ISheetData_Activity_ChestUp[];
	230812: ISheetData_Activity_ChestUp[];
	230813: ISheetData_Activity_ChestUp[];
	230814: ISheetData_Activity_ChestUp[];
	230815: ISheetData_Activity_ChestUp[];
	230905: ISheetData_Activity_ChestUp[];
	230906: ISheetData_Activity_ChestUp[];
	231005: ISheetData_Activity_ChestUp[];
	231006: ISheetData_Activity_ChestUp[];
	231007: ISheetData_Activity_ChestUp[];
	231008: ISheetData_Activity_ChestUp[];
	231009: ISheetData_Activity_ChestUp[];
	231010: ISheetData_Activity_ChestUp[];
	231121: ISheetData_Activity_ChestUp[];
	231122: ISheetData_Activity_ChestUp[];
	231161: ISheetData_Activity_ChestUp[];
	231162: ISheetData_Activity_ChestUp[];
	231163: ISheetData_Activity_ChestUp[];
	231164: ISheetData_Activity_ChestUp[];
	231165: ISheetData_Activity_ChestUp[];
	231166: ISheetData_Activity_ChestUp[];
	231231: ISheetData_Activity_ChestUp[];
	231232: ISheetData_Activity_ChestUp[];
	231233: ISheetData_Activity_ChestUp[];
	231234: ISheetData_Activity_ChestUp[];
	231235: ISheetData_Activity_ChestUp[];
	231236: ISheetData_Activity_ChestUp[];
	240121: ISheetData_Activity_ChestUp[];
	240122: ISheetData_Activity_ChestUp[];
	240123: ISheetData_Activity_ChestUp[];
	240124: ISheetData_Activity_ChestUp[];
	240125: ISheetData_Activity_ChestUp[];
	240126: ISheetData_Activity_ChestUp[];
	240127: ISheetData_Activity_ChestUp[];
	240128: ISheetData_Activity_ChestUp[];
	240129: ISheetData_Activity_ChestUp[];
	240130: ISheetData_Activity_ChestUp[];
	240131: ISheetData_Activity_ChestUp[];
	240132: ISheetData_Activity_ChestUp[];
	240133: ISheetData_Activity_ChestUp[];
	240134: ISheetData_Activity_ChestUp[];
	240135: ISheetData_Activity_ChestUp[];
	240136: ISheetData_Activity_ChestUp[];
	240137: ISheetData_Activity_ChestUp[];
	240138: ISheetData_Activity_ChestUp[];
	240139: ISheetData_Activity_ChestUp[];
	240140: ISheetData_Activity_ChestUp[];
	240141: ISheetData_Activity_ChestUp[];
	240142: ISheetData_Activity_ChestUp[];
	240143: ISheetData_Activity_ChestUp[];
	240144: ISheetData_Activity_ChestUp[];
	240145: ISheetData_Activity_ChestUp[];
	240146: ISheetData_Activity_ChestUp[];
	240147: ISheetData_Activity_ChestUp[];
	240148: ISheetData_Activity_ChestUp[];
	240149: ISheetData_Activity_ChestUp[];
	240205: ISheetData_Activity_ChestUp[];
	240206: ISheetData_Activity_ChestUp[];
	240207: ISheetData_Activity_ChestUp[];
	240311: ISheetData_Activity_ChestUp[];
	240312: ISheetData_Activity_ChestUp[];
	240313: ISheetData_Activity_ChestUp[];
	240421: ISheetData_Activity_ChestUp[];
	240422: ISheetData_Activity_ChestUp[];
	240511: ISheetData_Activity_ChestUp[];
	240512: ISheetData_Activity_ChestUp[];
	240513: ISheetData_Activity_ChestUp[];
	240620: ISheetData_Activity_ChestUp[];
	240621: ISheetData_Activity_ChestUp[];
	240622: ISheetData_Activity_ChestUp[];
	240623: ISheetData_Activity_ChestUp[];
	240624: ISheetData_Activity_ChestUp[];
	240625: ISheetData_Activity_ChestUp[];
	240720: ISheetData_Activity_ChestUp[];
	240721: ISheetData_Activity_ChestUp[];
	240722: ISheetData_Activity_ChestUp[];
	240723: ISheetData_Activity_ChestUp[];
	240830: ISheetData_Activity_ChestUp[];
	240831: ISheetData_Activity_ChestUp[];
	240832: ISheetData_Activity_ChestUp[];
	240833: ISheetData_Activity_ChestUp[];
	240834: ISheetData_Activity_ChestUp[];
	240920: ISheetData_Activity_ChestUp[];
	240921: ISheetData_Activity_ChestUp[];
	240922: ISheetData_Activity_ChestUp[];
	240923: ISheetData_Activity_ChestUp[];
	241020: ISheetData_Activity_ChestUp[];
	241021: ISheetData_Activity_ChestUp[];
	241022: ISheetData_Activity_ChestUp[];
	241023: ISheetData_Activity_ChestUp[];
	241024: ISheetData_Activity_ChestUp[];
	241025: ISheetData_Activity_ChestUp[];
	241121: ISheetData_Activity_ChestUp[];
	241122: ISheetData_Activity_ChestUp[];
	241220: ISheetData_Activity_ChestUp[];
	241221: ISheetData_Activity_ChestUp[];
	241222: ISheetData_Activity_ChestUp[];
	241223: ISheetData_Activity_ChestUp[];
	241224: ISheetData_Activity_ChestUp[];
	241225: ISheetData_Activity_ChestUp[];
	241226: ISheetData_Activity_ChestUp[];
	241227: ISheetData_Activity_ChestUp[];
	241228: ISheetData_Activity_ChestUp[];
	241229: ISheetData_Activity_ChestUp[];
	250126: ISheetData_Activity_ChestUp[];
	250127: ISheetData_Activity_ChestUp[];
	250130: ISheetData_Activity_ChestUp[];
	250131: ISheetData_Activity_ChestUp[];
	250132: ISheetData_Activity_ChestUp[];
	250133: ISheetData_Activity_ChestUp[];
	250134: ISheetData_Activity_ChestUp[];
	250135: ISheetData_Activity_ChestUp[];
	250136: ISheetData_Activity_ChestUp[];
	250137: ISheetData_Activity_ChestUp[];
	250138: ISheetData_Activity_ChestUp[];
	250139: ISheetData_Activity_ChestUp[];
	250140: ISheetData_Activity_ChestUp[];
	250141: ISheetData_Activity_ChestUp[];
	250142: ISheetData_Activity_ChestUp[];
	250143: ISheetData_Activity_ChestUp[];
	250144: ISheetData_Activity_ChestUp[];
	250145: ISheetData_Activity_ChestUp[];
	250146: ISheetData_Activity_ChestUp[];
	250147: ISheetData_Activity_ChestUp[];
	250148: ISheetData_Activity_ChestUp[];
	250149: ISheetData_Activity_ChestUp[];
	250150: ISheetData_Activity_ChestUp[];
	250151: ISheetData_Activity_ChestUp[];
	250152: ISheetData_Activity_ChestUp[];
	250153: ISheetData_Activity_ChestUp[];
	250154: ISheetData_Activity_ChestUp[];
	250155: ISheetData_Activity_ChestUp[];
	250156: ISheetData_Activity_ChestUp[];
	250157: ISheetData_Activity_ChestUp[];
	250158: ISheetData_Activity_ChestUp[];
	250159: ISheetData_Activity_ChestUp[];
	250160: ISheetData_Activity_ChestUp[];
	250161: ISheetData_Activity_ChestUp[];
	250162: ISheetData_Activity_ChestUp[];
	250163: ISheetData_Activity_ChestUp[];
	250220: ISheetData_Activity_ChestUp[];
	250221: ISheetData_Activity_ChestUp[];
	250222: ISheetData_Activity_ChestUp[];
	250223: ISheetData_Activity_ChestUp[];
	250320: ISheetData_Activity_ChestUp[];
	250321: ISheetData_Activity_ChestUp[];
	250322: ISheetData_Activity_ChestUp[];
	250323: ISheetData_Activity_ChestUp[];
	250430: ISheetData_Activity_ChestUp[];
	250431: ISheetData_Activity_ChestUp[];
	250520: ISheetData_Activity_ChestUp[];
	250521: ISheetData_Activity_ChestUp[];
	250522: ISheetData_Activity_ChestUp[];
	250523: ISheetData_Activity_ChestUp[];
	250620: ISheetData_Activity_ChestUp[];
	250621: ISheetData_Activity_ChestUp[];
	250622: ISheetData_Activity_ChestUp[];
	250623: ISheetData_Activity_ChestUp[];
	250624: ISheetData_Activity_ChestUp[];
	250625: ISheetData_Activity_ChestUp[];
	250720: ISheetData_Activity_ChestUp[];
	250721: ISheetData_Activity_ChestUp[];
	250722: ISheetData_Activity_ChestUp[];
	250723: ISheetData_Activity_ChestUp[];
	250840: ISheetData_Activity_ChestUp[];
	250841: ISheetData_Activity_ChestUp[];
	250842: ISheetData_Activity_ChestUp[];
	250843: ISheetData_Activity_ChestUp[];
	250844: ISheetData_Activity_ChestUp[];
	250920: ISheetData_Activity_ChestUp[];
	250921: ISheetData_Activity_ChestUp[];
	250922: ISheetData_Activity_ChestUp[];
	250923: ISheetData_Activity_ChestUp[];
}
declare interface ISheetData_Activity_ChestUp {
	/** 活动id */
	activity_id: number;
	/** 宝箱ID */
	chest_id: number;
	/** up编号 */
	up_id: number;
	/** 卡池短名 */
	title_str_id: number;
	/** 卡池说明文，高亮用[tag]区分[/tag] */
	str_id: string;
	/** 角色出率文本 */
	chara_str_id: number;
	/** 装扮出率文本 */
	item_str_id: number;
	/** 宣传图 */
	img: string;
	/** 卡池标题图 */
	title_img: string;
	/** 卡池标题图2（左下，联动/ur） */
	title_img_2: string;
	/** 排版种类0常规 1普通轮换 2UR角色 3联动  4自选 */
	typeset: number;
	/** 进入动画 */
	enter_animation: string;
	/** 特效前 */
	special_effect_front: string;
	/** 特效后，常驻，特效替换樱花特效 */
	special_effect_back: string;
	/** audio表内音效 */
	special_audio: number;
	/** 0=无up装扮，1=新装扮，2=特定老装扮，3=常驻装扮 */
	up_items_type: number;
	/** UP的物品 */
	up_items: number[];
}
//#endregion

//#region game_task --- unique
declare interface ISheet_Activity_GameTask {
	rows: ISheetData_Activity_GameTask[];
	1004001: ISheetData_Activity_GameTask;
	1004002: ISheetData_Activity_GameTask;
	1004003: ISheetData_Activity_GameTask;
	1004004: ISheetData_Activity_GameTask;
	1004005: ISheetData_Activity_GameTask;
	1004006: ISheetData_Activity_GameTask;
	1004007: ISheetData_Activity_GameTask;
	1004008: ISheetData_Activity_GameTask;
	1004009: ISheetData_Activity_GameTask;
	1004010: ISheetData_Activity_GameTask;
	1004011: ISheetData_Activity_GameTask;
	1004012: ISheetData_Activity_GameTask;
	1004013: ISheetData_Activity_GameTask;
	1004014: ISheetData_Activity_GameTask;
	1004015: ISheetData_Activity_GameTask;
	1004016: ISheetData_Activity_GameTask;
	1004017: ISheetData_Activity_GameTask;
	1004018: ISheetData_Activity_GameTask;
	1004019: ISheetData_Activity_GameTask;
	1004020: ISheetData_Activity_GameTask;
	1004021: ISheetData_Activity_GameTask;
	1004022: ISheetData_Activity_GameTask;
	1004023: ISheetData_Activity_GameTask;
	1004024: ISheetData_Activity_GameTask;
	1004025: ISheetData_Activity_GameTask;
	1004026: ISheetData_Activity_GameTask;
	1004027: ISheetData_Activity_GameTask;
	1004028: ISheetData_Activity_GameTask;
	1004029: ISheetData_Activity_GameTask;
	1004030: ISheetData_Activity_GameTask;
	1004031: ISheetData_Activity_GameTask;
	1004032: ISheetData_Activity_GameTask;
	1004033: ISheetData_Activity_GameTask;
	1004034: ISheetData_Activity_GameTask;
	1004035: ISheetData_Activity_GameTask;
	1004036: ISheetData_Activity_GameTask;
	1004037: ISheetData_Activity_GameTask;
	1004038: ISheetData_Activity_GameTask;
	1004039: ISheetData_Activity_GameTask;
	1004040: ISheetData_Activity_GameTask;
	1004041: ISheetData_Activity_GameTask;
	1004042: ISheetData_Activity_GameTask;
	1004043: ISheetData_Activity_GameTask;
	1004044: ISheetData_Activity_GameTask;
	1004045: ISheetData_Activity_GameTask;
	1004046: ISheetData_Activity_GameTask;
	1004047: ISheetData_Activity_GameTask;
	1004048: ISheetData_Activity_GameTask;
	1004049: ISheetData_Activity_GameTask;
	1012001: ISheetData_Activity_GameTask;
	1012002: ISheetData_Activity_GameTask;
	1012003: ISheetData_Activity_GameTask;
	1012004: ISheetData_Activity_GameTask;
	1012005: ISheetData_Activity_GameTask;
	1012006: ISheetData_Activity_GameTask;
	1012007: ISheetData_Activity_GameTask;
	1012008: ISheetData_Activity_GameTask;
	1012009: ISheetData_Activity_GameTask;
	1012010: ISheetData_Activity_GameTask;
	1012011: ISheetData_Activity_GameTask;
	1012012: ISheetData_Activity_GameTask;
	1012013: ISheetData_Activity_GameTask;
	1012014: ISheetData_Activity_GameTask;
	1012015: ISheetData_Activity_GameTask;
	1012016: ISheetData_Activity_GameTask;
	1012017: ISheetData_Activity_GameTask;
	1012018: ISheetData_Activity_GameTask;
	1012019: ISheetData_Activity_GameTask;
	1012020: ISheetData_Activity_GameTask;
	1012021: ISheetData_Activity_GameTask;
	1012022: ISheetData_Activity_GameTask;
	1012023: ISheetData_Activity_GameTask;
	1012024: ISheetData_Activity_GameTask;
	1012025: ISheetData_Activity_GameTask;
	1012026: ISheetData_Activity_GameTask;
	1012027: ISheetData_Activity_GameTask;
	1012028: ISheetData_Activity_GameTask;
	1012029: ISheetData_Activity_GameTask;
	1012030: ISheetData_Activity_GameTask;
	1012031: ISheetData_Activity_GameTask;
	1012032: ISheetData_Activity_GameTask;
	1012033: ISheetData_Activity_GameTask;
	1012034: ISheetData_Activity_GameTask;
	1012035: ISheetData_Activity_GameTask;
	1012036: ISheetData_Activity_GameTask;
	1012037: ISheetData_Activity_GameTask;
	1012038: ISheetData_Activity_GameTask;
	1012039: ISheetData_Activity_GameTask;
	1012040: ISheetData_Activity_GameTask;
	1012041: ISheetData_Activity_GameTask;
	1012042: ISheetData_Activity_GameTask;
	1012043: ISheetData_Activity_GameTask;
	1012044: ISheetData_Activity_GameTask;
	1012045: ISheetData_Activity_GameTask;
	1012046: ISheetData_Activity_GameTask;
	1012047: ISheetData_Activity_GameTask;
	1012048: ISheetData_Activity_GameTask;
	1012049: ISheetData_Activity_GameTask;
	1024001: ISheetData_Activity_GameTask;
	1024002: ISheetData_Activity_GameTask;
	1024003: ISheetData_Activity_GameTask;
	1024004: ISheetData_Activity_GameTask;
	1024005: ISheetData_Activity_GameTask;
	1024006: ISheetData_Activity_GameTask;
	1024007: ISheetData_Activity_GameTask;
	1024008: ISheetData_Activity_GameTask;
	1024009: ISheetData_Activity_GameTask;
	1024010: ISheetData_Activity_GameTask;
	1024011: ISheetData_Activity_GameTask;
	1024012: ISheetData_Activity_GameTask;
	1024013: ISheetData_Activity_GameTask;
	1024014: ISheetData_Activity_GameTask;
	1024015: ISheetData_Activity_GameTask;
	1024016: ISheetData_Activity_GameTask;
	1024017: ISheetData_Activity_GameTask;
	1024018: ISheetData_Activity_GameTask;
	1024019: ISheetData_Activity_GameTask;
	1024020: ISheetData_Activity_GameTask;
	1024021: ISheetData_Activity_GameTask;
	1024022: ISheetData_Activity_GameTask;
	1024023: ISheetData_Activity_GameTask;
	1024024: ISheetData_Activity_GameTask;
	1024025: ISheetData_Activity_GameTask;
	1024026: ISheetData_Activity_GameTask;
	1024027: ISheetData_Activity_GameTask;
	1024028: ISheetData_Activity_GameTask;
	1024029: ISheetData_Activity_GameTask;
	1024030: ISheetData_Activity_GameTask;
	1024031: ISheetData_Activity_GameTask;
	1024032: ISheetData_Activity_GameTask;
	1024033: ISheetData_Activity_GameTask;
	1024034: ISheetData_Activity_GameTask;
	1024035: ISheetData_Activity_GameTask;
	1024036: ISheetData_Activity_GameTask;
	1024037: ISheetData_Activity_GameTask;
	1024038: ISheetData_Activity_GameTask;
	1024039: ISheetData_Activity_GameTask;
	1024040: ISheetData_Activity_GameTask;
	1024041: ISheetData_Activity_GameTask;
	1024042: ISheetData_Activity_GameTask;
	1024043: ISheetData_Activity_GameTask;
	1024044: ISheetData_Activity_GameTask;
	1024045: ISheetData_Activity_GameTask;
	1024046: ISheetData_Activity_GameTask;
	1024047: ISheetData_Activity_GameTask;
	1024048: ISheetData_Activity_GameTask;
	1024049: ISheetData_Activity_GameTask;
	1024050: ISheetData_Activity_GameTask;
	1024051: ISheetData_Activity_GameTask;
	1024052: ISheetData_Activity_GameTask;
	1024053: ISheetData_Activity_GameTask;
	1024054: ISheetData_Activity_GameTask;
	1024055: ISheetData_Activity_GameTask;
	1024056: ISheetData_Activity_GameTask;
	1024057: ISheetData_Activity_GameTask;
	1024058: ISheetData_Activity_GameTask;
	1024059: ISheetData_Activity_GameTask;
	1024060: ISheetData_Activity_GameTask;
	1024061: ISheetData_Activity_GameTask;
	1024062: ISheetData_Activity_GameTask;
	1024063: ISheetData_Activity_GameTask;
	1062001: ISheetData_Activity_GameTask;
	1062002: ISheetData_Activity_GameTask;
	1062003: ISheetData_Activity_GameTask;
	1062004: ISheetData_Activity_GameTask;
	1062005: ISheetData_Activity_GameTask;
	1062006: ISheetData_Activity_GameTask;
	1062007: ISheetData_Activity_GameTask;
	1062008: ISheetData_Activity_GameTask;
	1062009: ISheetData_Activity_GameTask;
	1062010: ISheetData_Activity_GameTask;
	1062011: ISheetData_Activity_GameTask;
	1062012: ISheetData_Activity_GameTask;
	1062013: ISheetData_Activity_GameTask;
	1062014: ISheetData_Activity_GameTask;
	1062015: ISheetData_Activity_GameTask;
	1062016: ISheetData_Activity_GameTask;
	1062017: ISheetData_Activity_GameTask;
	1062018: ISheetData_Activity_GameTask;
	1062019: ISheetData_Activity_GameTask;
	1062020: ISheetData_Activity_GameTask;
	1062021: ISheetData_Activity_GameTask;
	1062022: ISheetData_Activity_GameTask;
	1062023: ISheetData_Activity_GameTask;
	1062024: ISheetData_Activity_GameTask;
	1062025: ISheetData_Activity_GameTask;
	1062026: ISheetData_Activity_GameTask;
	1062027: ISheetData_Activity_GameTask;
	1062028: ISheetData_Activity_GameTask;
	1062029: ISheetData_Activity_GameTask;
	1062030: ISheetData_Activity_GameTask;
	1062031: ISheetData_Activity_GameTask;
	1062032: ISheetData_Activity_GameTask;
	1062033: ISheetData_Activity_GameTask;
	1062034: ISheetData_Activity_GameTask;
	1062035: ISheetData_Activity_GameTask;
	1062036: ISheetData_Activity_GameTask;
	1062037: ISheetData_Activity_GameTask;
	1062038: ISheetData_Activity_GameTask;
	1062039: ISheetData_Activity_GameTask;
	1062040: ISheetData_Activity_GameTask;
	1062041: ISheetData_Activity_GameTask;
	1062042: ISheetData_Activity_GameTask;
	1062043: ISheetData_Activity_GameTask;
	1062044: ISheetData_Activity_GameTask;
	1062045: ISheetData_Activity_GameTask;
	1062046: ISheetData_Activity_GameTask;
	1062047: ISheetData_Activity_GameTask;
	1062048: ISheetData_Activity_GameTask;
	1062049: ISheetData_Activity_GameTask;
	1080001: ISheetData_Activity_GameTask;
	1080002: ISheetData_Activity_GameTask;
	1080003: ISheetData_Activity_GameTask;
	1080004: ISheetData_Activity_GameTask;
	1080005: ISheetData_Activity_GameTask;
	1080006: ISheetData_Activity_GameTask;
	1080007: ISheetData_Activity_GameTask;
	1080008: ISheetData_Activity_GameTask;
	1080009: ISheetData_Activity_GameTask;
	1080010: ISheetData_Activity_GameTask;
	1080011: ISheetData_Activity_GameTask;
	1080012: ISheetData_Activity_GameTask;
	1080013: ISheetData_Activity_GameTask;
	1080014: ISheetData_Activity_GameTask;
	1080015: ISheetData_Activity_GameTask;
	1080016: ISheetData_Activity_GameTask;
	1080017: ISheetData_Activity_GameTask;
	1080018: ISheetData_Activity_GameTask;
	1080019: ISheetData_Activity_GameTask;
	1080020: ISheetData_Activity_GameTask;
	1080021: ISheetData_Activity_GameTask;
	1080022: ISheetData_Activity_GameTask;
	1080023: ISheetData_Activity_GameTask;
	1080024: ISheetData_Activity_GameTask;
	1080025: ISheetData_Activity_GameTask;
	1080026: ISheetData_Activity_GameTask;
	1080027: ISheetData_Activity_GameTask;
	1080028: ISheetData_Activity_GameTask;
	1080029: ISheetData_Activity_GameTask;
	1080030: ISheetData_Activity_GameTask;
	1080031: ISheetData_Activity_GameTask;
	1080032: ISheetData_Activity_GameTask;
	1080033: ISheetData_Activity_GameTask;
	1080034: ISheetData_Activity_GameTask;
	1080035: ISheetData_Activity_GameTask;
	1080036: ISheetData_Activity_GameTask;
	1080037: ISheetData_Activity_GameTask;
	1080038: ISheetData_Activity_GameTask;
	1080039: ISheetData_Activity_GameTask;
	1080040: ISheetData_Activity_GameTask;
	1080041: ISheetData_Activity_GameTask;
	1080042: ISheetData_Activity_GameTask;
	1080043: ISheetData_Activity_GameTask;
	1080044: ISheetData_Activity_GameTask;
	1080045: ISheetData_Activity_GameTask;
	1080046: ISheetData_Activity_GameTask;
	1080047: ISheetData_Activity_GameTask;
	1080048: ISheetData_Activity_GameTask;
	1080049: ISheetData_Activity_GameTask;
	1091001: ISheetData_Activity_GameTask;
	1091002: ISheetData_Activity_GameTask;
	1091003: ISheetData_Activity_GameTask;
	1091004: ISheetData_Activity_GameTask;
	1091005: ISheetData_Activity_GameTask;
	1091006: ISheetData_Activity_GameTask;
	1091007: ISheetData_Activity_GameTask;
	1091008: ISheetData_Activity_GameTask;
	1091009: ISheetData_Activity_GameTask;
	1091010: ISheetData_Activity_GameTask;
	1110001: ISheetData_Activity_GameTask;
	1110002: ISheetData_Activity_GameTask;
	1110003: ISheetData_Activity_GameTask;
	1110004: ISheetData_Activity_GameTask;
	1110005: ISheetData_Activity_GameTask;
	1110006: ISheetData_Activity_GameTask;
	1110007: ISheetData_Activity_GameTask;
	1110008: ISheetData_Activity_GameTask;
	1110009: ISheetData_Activity_GameTask;
	1110010: ISheetData_Activity_GameTask;
	1167001: ISheetData_Activity_GameTask;
	1167002: ISheetData_Activity_GameTask;
	1167003: ISheetData_Activity_GameTask;
	1167004: ISheetData_Activity_GameTask;
	1167005: ISheetData_Activity_GameTask;
	1167006: ISheetData_Activity_GameTask;
	1167007: ISheetData_Activity_GameTask;
	1167008: ISheetData_Activity_GameTask;
	1167009: ISheetData_Activity_GameTask;
	1167010: ISheetData_Activity_GameTask;
	1167011: ISheetData_Activity_GameTask;
	1167012: ISheetData_Activity_GameTask;
	1167013: ISheetData_Activity_GameTask;
	1167014: ISheetData_Activity_GameTask;
	1167015: ISheetData_Activity_GameTask;
	1167016: ISheetData_Activity_GameTask;
	1167017: ISheetData_Activity_GameTask;
	1167018: ISheetData_Activity_GameTask;
	1167019: ISheetData_Activity_GameTask;
	1167020: ISheetData_Activity_GameTask;
	1167021: ISheetData_Activity_GameTask;
	1167022: ISheetData_Activity_GameTask;
	1167023: ISheetData_Activity_GameTask;
	1167024: ISheetData_Activity_GameTask;
	1167025: ISheetData_Activity_GameTask;
	1167026: ISheetData_Activity_GameTask;
	1167027: ISheetData_Activity_GameTask;
	1167028: ISheetData_Activity_GameTask;
	1167029: ISheetData_Activity_GameTask;
	1167030: ISheetData_Activity_GameTask;
	1167031: ISheetData_Activity_GameTask;
	1167032: ISheetData_Activity_GameTask;
	1167033: ISheetData_Activity_GameTask;
	1167034: ISheetData_Activity_GameTask;
	1167035: ISheetData_Activity_GameTask;
	1167036: ISheetData_Activity_GameTask;
	1167037: ISheetData_Activity_GameTask;
	1167038: ISheetData_Activity_GameTask;
	1167039: ISheetData_Activity_GameTask;
	1167040: ISheetData_Activity_GameTask;
	1167041: ISheetData_Activity_GameTask;
	1167042: ISheetData_Activity_GameTask;
	1167043: ISheetData_Activity_GameTask;
	1167044: ISheetData_Activity_GameTask;
	1167045: ISheetData_Activity_GameTask;
	1167046: ISheetData_Activity_GameTask;
	1167047: ISheetData_Activity_GameTask;
	1167048: ISheetData_Activity_GameTask;
	1167049: ISheetData_Activity_GameTask;
	1179001: ISheetData_Activity_GameTask;
	1179002: ISheetData_Activity_GameTask;
	1179003: ISheetData_Activity_GameTask;
	1179004: ISheetData_Activity_GameTask;
	1179005: ISheetData_Activity_GameTask;
	1179006: ISheetData_Activity_GameTask;
	1179007: ISheetData_Activity_GameTask;
	1179008: ISheetData_Activity_GameTask;
	1179009: ISheetData_Activity_GameTask;
	1179010: ISheetData_Activity_GameTask;
	1179011: ISheetData_Activity_GameTask;
	1179012: ISheetData_Activity_GameTask;
	1179013: ISheetData_Activity_GameTask;
	1179014: ISheetData_Activity_GameTask;
	1179015: ISheetData_Activity_GameTask;
	1179016: ISheetData_Activity_GameTask;
	1179017: ISheetData_Activity_GameTask;
	1179018: ISheetData_Activity_GameTask;
	1179019: ISheetData_Activity_GameTask;
	1179020: ISheetData_Activity_GameTask;
	1220001: ISheetData_Activity_GameTask;
	1220002: ISheetData_Activity_GameTask;
	1220003: ISheetData_Activity_GameTask;
	1220004: ISheetData_Activity_GameTask;
	1220005: ISheetData_Activity_GameTask;
	1220006: ISheetData_Activity_GameTask;
	1220007: ISheetData_Activity_GameTask;
	1220008: ISheetData_Activity_GameTask;
	1220009: ISheetData_Activity_GameTask;
	1220010: ISheetData_Activity_GameTask;
	1220011: ISheetData_Activity_GameTask;
	1220012: ISheetData_Activity_GameTask;
	1220013: ISheetData_Activity_GameTask;
	1220014: ISheetData_Activity_GameTask;
	1220015: ISheetData_Activity_GameTask;
	1220016: ISheetData_Activity_GameTask;
	1220017: ISheetData_Activity_GameTask;
	1220018: ISheetData_Activity_GameTask;
	1220019: ISheetData_Activity_GameTask;
	1220020: ISheetData_Activity_GameTask;
	1220021: ISheetData_Activity_GameTask;
	1220022: ISheetData_Activity_GameTask;
	1220023: ISheetData_Activity_GameTask;
	1220024: ISheetData_Activity_GameTask;
	1220025: ISheetData_Activity_GameTask;
	1220026: ISheetData_Activity_GameTask;
	1220027: ISheetData_Activity_GameTask;
	1220028: ISheetData_Activity_GameTask;
	1220029: ISheetData_Activity_GameTask;
	1220030: ISheetData_Activity_GameTask;
	1220031: ISheetData_Activity_GameTask;
	1220032: ISheetData_Activity_GameTask;
	1220033: ISheetData_Activity_GameTask;
	1220034: ISheetData_Activity_GameTask;
	1220035: ISheetData_Activity_GameTask;
	1220036: ISheetData_Activity_GameTask;
	1220037: ISheetData_Activity_GameTask;
	1220038: ISheetData_Activity_GameTask;
	1220039: ISheetData_Activity_GameTask;
	1220040: ISheetData_Activity_GameTask;
	1220041: ISheetData_Activity_GameTask;
	1220042: ISheetData_Activity_GameTask;
	1220043: ISheetData_Activity_GameTask;
	1220044: ISheetData_Activity_GameTask;
	1220045: ISheetData_Activity_GameTask;
	1220046: ISheetData_Activity_GameTask;
	1220047: ISheetData_Activity_GameTask;
	1220048: ISheetData_Activity_GameTask;
	1220049: ISheetData_Activity_GameTask;
	22030501: ISheetData_Activity_GameTask;
	22030502: ISheetData_Activity_GameTask;
	22030503: ISheetData_Activity_GameTask;
	22030504: ISheetData_Activity_GameTask;
	22030505: ISheetData_Activity_GameTask;
	22030506: ISheetData_Activity_GameTask;
	22030507: ISheetData_Activity_GameTask;
	22030508: ISheetData_Activity_GameTask;
	22030509: ISheetData_Activity_GameTask;
	22030510: ISheetData_Activity_GameTask;
	22030511: ISheetData_Activity_GameTask;
	22030512: ISheetData_Activity_GameTask;
	22030513: ISheetData_Activity_GameTask;
	22030514: ISheetData_Activity_GameTask;
	22030515: ISheetData_Activity_GameTask;
	22030516: ISheetData_Activity_GameTask;
	22030517: ISheetData_Activity_GameTask;
	22030518: ISheetData_Activity_GameTask;
	22030519: ISheetData_Activity_GameTask;
	22030520: ISheetData_Activity_GameTask;
	22030521: ISheetData_Activity_GameTask;
	22030522: ISheetData_Activity_GameTask;
	22030523: ISheetData_Activity_GameTask;
	22030524: ISheetData_Activity_GameTask;
	22030525: ISheetData_Activity_GameTask;
	22030526: ISheetData_Activity_GameTask;
	22030527: ISheetData_Activity_GameTask;
	22030528: ISheetData_Activity_GameTask;
	22030529: ISheetData_Activity_GameTask;
	22030530: ISheetData_Activity_GameTask;
	22030531: ISheetData_Activity_GameTask;
	22030532: ISheetData_Activity_GameTask;
	22030533: ISheetData_Activity_GameTask;
	22030534: ISheetData_Activity_GameTask;
	22030535: ISheetData_Activity_GameTask;
	22030536: ISheetData_Activity_GameTask;
	22030537: ISheetData_Activity_GameTask;
	22030538: ISheetData_Activity_GameTask;
	22030539: ISheetData_Activity_GameTask;
	22030540: ISheetData_Activity_GameTask;
	22030541: ISheetData_Activity_GameTask;
	22030542: ISheetData_Activity_GameTask;
	22030543: ISheetData_Activity_GameTask;
	22030544: ISheetData_Activity_GameTask;
	22030545: ISheetData_Activity_GameTask;
	22030546: ISheetData_Activity_GameTask;
	22030547: ISheetData_Activity_GameTask;
	22030548: ISheetData_Activity_GameTask;
	22030549: ISheetData_Activity_GameTask;
	22040601: ISheetData_Activity_GameTask;
	22040602: ISheetData_Activity_GameTask;
	22040603: ISheetData_Activity_GameTask;
	22040604: ISheetData_Activity_GameTask;
	22040605: ISheetData_Activity_GameTask;
	22040606: ISheetData_Activity_GameTask;
	22040607: ISheetData_Activity_GameTask;
	22040608: ISheetData_Activity_GameTask;
	22040609: ISheetData_Activity_GameTask;
	22040610: ISheetData_Activity_GameTask;
	22040611: ISheetData_Activity_GameTask;
	22040612: ISheetData_Activity_GameTask;
	22040613: ISheetData_Activity_GameTask;
	22040614: ISheetData_Activity_GameTask;
	22040615: ISheetData_Activity_GameTask;
	22040616: ISheetData_Activity_GameTask;
	22040617: ISheetData_Activity_GameTask;
	22040618: ISheetData_Activity_GameTask;
	22040619: ISheetData_Activity_GameTask;
	22040620: ISheetData_Activity_GameTask;
	22040621: ISheetData_Activity_GameTask;
	22040622: ISheetData_Activity_GameTask;
	22040623: ISheetData_Activity_GameTask;
	22070501: ISheetData_Activity_GameTask;
	22070502: ISheetData_Activity_GameTask;
	22070503: ISheetData_Activity_GameTask;
	22070504: ISheetData_Activity_GameTask;
	22070505: ISheetData_Activity_GameTask;
	22070506: ISheetData_Activity_GameTask;
	22070507: ISheetData_Activity_GameTask;
	22070508: ISheetData_Activity_GameTask;
	22070509: ISheetData_Activity_GameTask;
	22070510: ISheetData_Activity_GameTask;
	22070511: ISheetData_Activity_GameTask;
	22070512: ISheetData_Activity_GameTask;
	22070513: ISheetData_Activity_GameTask;
	22070514: ISheetData_Activity_GameTask;
	22070515: ISheetData_Activity_GameTask;
	22070516: ISheetData_Activity_GameTask;
	22070517: ISheetData_Activity_GameTask;
	22070518: ISheetData_Activity_GameTask;
	22070519: ISheetData_Activity_GameTask;
	22070520: ISheetData_Activity_GameTask;
	22070521: ISheetData_Activity_GameTask;
	22070522: ISheetData_Activity_GameTask;
	22070523: ISheetData_Activity_GameTask;
	22070524: ISheetData_Activity_GameTask;
	22070525: ISheetData_Activity_GameTask;
	22070526: ISheetData_Activity_GameTask;
	22070527: ISheetData_Activity_GameTask;
	22070528: ISheetData_Activity_GameTask;
	22070529: ISheetData_Activity_GameTask;
	22070530: ISheetData_Activity_GameTask;
	22070531: ISheetData_Activity_GameTask;
	22070532: ISheetData_Activity_GameTask;
	22070533: ISheetData_Activity_GameTask;
	22070534: ISheetData_Activity_GameTask;
	22070535: ISheetData_Activity_GameTask;
	22070536: ISheetData_Activity_GameTask;
	22070537: ISheetData_Activity_GameTask;
	22070538: ISheetData_Activity_GameTask;
	22070539: ISheetData_Activity_GameTask;
	22070540: ISheetData_Activity_GameTask;
	22070541: ISheetData_Activity_GameTask;
	22070542: ISheetData_Activity_GameTask;
	22070543: ISheetData_Activity_GameTask;
	22070544: ISheetData_Activity_GameTask;
	22070545: ISheetData_Activity_GameTask;
	22070546: ISheetData_Activity_GameTask;
	22070547: ISheetData_Activity_GameTask;
	22070548: ISheetData_Activity_GameTask;
	22070549: ISheetData_Activity_GameTask;
	22110501: ISheetData_Activity_GameTask;
	22110502: ISheetData_Activity_GameTask;
	22110503: ISheetData_Activity_GameTask;
	22110504: ISheetData_Activity_GameTask;
	22110505: ISheetData_Activity_GameTask;
	22110506: ISheetData_Activity_GameTask;
	22110507: ISheetData_Activity_GameTask;
	22110508: ISheetData_Activity_GameTask;
	22110509: ISheetData_Activity_GameTask;
	22110510: ISheetData_Activity_GameTask;
	22110511: ISheetData_Activity_GameTask;
	22110512: ISheetData_Activity_GameTask;
	22110513: ISheetData_Activity_GameTask;
	22110514: ISheetData_Activity_GameTask;
	22110515: ISheetData_Activity_GameTask;
	22110516: ISheetData_Activity_GameTask;
	22110517: ISheetData_Activity_GameTask;
	22110518: ISheetData_Activity_GameTask;
	22110519: ISheetData_Activity_GameTask;
	22110520: ISheetData_Activity_GameTask;
	22110521: ISheetData_Activity_GameTask;
	22110522: ISheetData_Activity_GameTask;
	22110523: ISheetData_Activity_GameTask;
	23040601: ISheetData_Activity_GameTask;
	23040602: ISheetData_Activity_GameTask;
	23040603: ISheetData_Activity_GameTask;
	23040604: ISheetData_Activity_GameTask;
	23040605: ISheetData_Activity_GameTask;
	23040606: ISheetData_Activity_GameTask;
	23040607: ISheetData_Activity_GameTask;
	23040608: ISheetData_Activity_GameTask;
	23040609: ISheetData_Activity_GameTask;
	23040610: ISheetData_Activity_GameTask;
	23040611: ISheetData_Activity_GameTask;
	23040612: ISheetData_Activity_GameTask;
	23040613: ISheetData_Activity_GameTask;
	23040614: ISheetData_Activity_GameTask;
	23040615: ISheetData_Activity_GameTask;
	23040616: ISheetData_Activity_GameTask;
	23040617: ISheetData_Activity_GameTask;
	23040618: ISheetData_Activity_GameTask;
	23040619: ISheetData_Activity_GameTask;
	23040620: ISheetData_Activity_GameTask;
	23040621: ISheetData_Activity_GameTask;
	23040622: ISheetData_Activity_GameTask;
	23040623: ISheetData_Activity_GameTask;
	23060201: ISheetData_Activity_GameTask;
	23060202: ISheetData_Activity_GameTask;
	23060203: ISheetData_Activity_GameTask;
	23060204: ISheetData_Activity_GameTask;
	23060205: ISheetData_Activity_GameTask;
	23060206: ISheetData_Activity_GameTask;
	23060207: ISheetData_Activity_GameTask;
	23060208: ISheetData_Activity_GameTask;
	23060209: ISheetData_Activity_GameTask;
	23060210: ISheetData_Activity_GameTask;
	23060211: ISheetData_Activity_GameTask;
	23060212: ISheetData_Activity_GameTask;
	23060213: ISheetData_Activity_GameTask;
	23060214: ISheetData_Activity_GameTask;
	23060215: ISheetData_Activity_GameTask;
	23060216: ISheetData_Activity_GameTask;
	23060217: ISheetData_Activity_GameTask;
	23060218: ISheetData_Activity_GameTask;
	23060219: ISheetData_Activity_GameTask;
	23060220: ISheetData_Activity_GameTask;
	23060221: ISheetData_Activity_GameTask;
	23060222: ISheetData_Activity_GameTask;
	23060223: ISheetData_Activity_GameTask;
	23060224: ISheetData_Activity_GameTask;
	23060225: ISheetData_Activity_GameTask;
	23060226: ISheetData_Activity_GameTask;
	23060227: ISheetData_Activity_GameTask;
	23060228: ISheetData_Activity_GameTask;
	23060229: ISheetData_Activity_GameTask;
	23060230: ISheetData_Activity_GameTask;
	23060231: ISheetData_Activity_GameTask;
	23060232: ISheetData_Activity_GameTask;
	23060233: ISheetData_Activity_GameTask;
	23060234: ISheetData_Activity_GameTask;
	23060235: ISheetData_Activity_GameTask;
	23060236: ISheetData_Activity_GameTask;
	23060237: ISheetData_Activity_GameTask;
	23060238: ISheetData_Activity_GameTask;
	23060239: ISheetData_Activity_GameTask;
	23060240: ISheetData_Activity_GameTask;
	23060241: ISheetData_Activity_GameTask;
	23060242: ISheetData_Activity_GameTask;
	23060243: ISheetData_Activity_GameTask;
	23060244: ISheetData_Activity_GameTask;
	23060245: ISheetData_Activity_GameTask;
	23060246: ISheetData_Activity_GameTask;
	23060247: ISheetData_Activity_GameTask;
	23060248: ISheetData_Activity_GameTask;
	23060249: ISheetData_Activity_GameTask;
	23111501: ISheetData_Activity_GameTask;
	23111502: ISheetData_Activity_GameTask;
	23111503: ISheetData_Activity_GameTask;
	23111504: ISheetData_Activity_GameTask;
	23111505: ISheetData_Activity_GameTask;
	23111506: ISheetData_Activity_GameTask;
	23111507: ISheetData_Activity_GameTask;
	23111508: ISheetData_Activity_GameTask;
	23111509: ISheetData_Activity_GameTask;
	23111510: ISheetData_Activity_GameTask;
	23111511: ISheetData_Activity_GameTask;
	23111512: ISheetData_Activity_GameTask;
	23111513: ISheetData_Activity_GameTask;
	23111514: ISheetData_Activity_GameTask;
	23111515: ISheetData_Activity_GameTask;
	23111516: ISheetData_Activity_GameTask;
	23111517: ISheetData_Activity_GameTask;
	23111518: ISheetData_Activity_GameTask;
	23111519: ISheetData_Activity_GameTask;
	23111520: ISheetData_Activity_GameTask;
	23111521: ISheetData_Activity_GameTask;
	23111522: ISheetData_Activity_GameTask;
	23111523: ISheetData_Activity_GameTask;
	23120201: ISheetData_Activity_GameTask;
	23120202: ISheetData_Activity_GameTask;
	23120203: ISheetData_Activity_GameTask;
	23120204: ISheetData_Activity_GameTask;
	23120205: ISheetData_Activity_GameTask;
	23120206: ISheetData_Activity_GameTask;
	24010401: ISheetData_Activity_GameTask;
	24040501: ISheetData_Activity_GameTask;
	24050101: ISheetData_Activity_GameTask;
	24050102: ISheetData_Activity_GameTask;
	24050103: ISheetData_Activity_GameTask;
	24050104: ISheetData_Activity_GameTask;
	24050105: ISheetData_Activity_GameTask;
	24050106: ISheetData_Activity_GameTask;
	24050107: ISheetData_Activity_GameTask;
	24050108: ISheetData_Activity_GameTask;
	24050109: ISheetData_Activity_GameTask;
	24050110: ISheetData_Activity_GameTask;
	24050111: ISheetData_Activity_GameTask;
	24050112: ISheetData_Activity_GameTask;
	24050113: ISheetData_Activity_GameTask;
	24050114: ISheetData_Activity_GameTask;
	24050115: ISheetData_Activity_GameTask;
	24050116: ISheetData_Activity_GameTask;
	24050117: ISheetData_Activity_GameTask;
	24050118: ISheetData_Activity_GameTask;
	24050119: ISheetData_Activity_GameTask;
	24050120: ISheetData_Activity_GameTask;
	24050121: ISheetData_Activity_GameTask;
	24050122: ISheetData_Activity_GameTask;
	24050123: ISheetData_Activity_GameTask;
	24050124: ISheetData_Activity_GameTask;
	24050125: ISheetData_Activity_GameTask;
	24050126: ISheetData_Activity_GameTask;
	24050127: ISheetData_Activity_GameTask;
	24050128: ISheetData_Activity_GameTask;
	24050129: ISheetData_Activity_GameTask;
	24050130: ISheetData_Activity_GameTask;
	24050131: ISheetData_Activity_GameTask;
	24050132: ISheetData_Activity_GameTask;
	24050133: ISheetData_Activity_GameTask;
	24050134: ISheetData_Activity_GameTask;
	24050135: ISheetData_Activity_GameTask;
	24050136: ISheetData_Activity_GameTask;
	24050137: ISheetData_Activity_GameTask;
	24050138: ISheetData_Activity_GameTask;
	24050139: ISheetData_Activity_GameTask;
	24050140: ISheetData_Activity_GameTask;
	24050141: ISheetData_Activity_GameTask;
	24050142: ISheetData_Activity_GameTask;
	24050143: ISheetData_Activity_GameTask;
	24050144: ISheetData_Activity_GameTask;
	24050145: ISheetData_Activity_GameTask;
	24050146: ISheetData_Activity_GameTask;
	24050147: ISheetData_Activity_GameTask;
	24050148: ISheetData_Activity_GameTask;
	24050149: ISheetData_Activity_GameTask;
	24110601: ISheetData_Activity_GameTask;
	24110602: ISheetData_Activity_GameTask;
	24110603: ISheetData_Activity_GameTask;
	24110604: ISheetData_Activity_GameTask;
	24110605: ISheetData_Activity_GameTask;
	24110606: ISheetData_Activity_GameTask;
	24110607: ISheetData_Activity_GameTask;
	24110608: ISheetData_Activity_GameTask;
	24110609: ISheetData_Activity_GameTask;
	24110610: ISheetData_Activity_GameTask;
	24110611: ISheetData_Activity_GameTask;
	24110612: ISheetData_Activity_GameTask;
	24110613: ISheetData_Activity_GameTask;
	25030101: ISheetData_Activity_GameTask;
	25030102: ISheetData_Activity_GameTask;
	25030103: ISheetData_Activity_GameTask;
	25030104: ISheetData_Activity_GameTask;
	25030105: ISheetData_Activity_GameTask;
	25030106: ISheetData_Activity_GameTask;
	25030107: ISheetData_Activity_GameTask;
	25030108: ISheetData_Activity_GameTask;
	25030109: ISheetData_Activity_GameTask;
	25030110: ISheetData_Activity_GameTask;
	25030111: ISheetData_Activity_GameTask;
	25030112: ISheetData_Activity_GameTask;
	25030113: ISheetData_Activity_GameTask;
	25030114: ISheetData_Activity_GameTask;
	25030115: ISheetData_Activity_GameTask;
	25030116: ISheetData_Activity_GameTask;
	25030117: ISheetData_Activity_GameTask;
	25030118: ISheetData_Activity_GameTask;
	25030119: ISheetData_Activity_GameTask;
	25030120: ISheetData_Activity_GameTask;
	25030121: ISheetData_Activity_GameTask;
	25030122: ISheetData_Activity_GameTask;
	25030123: ISheetData_Activity_GameTask;
	25030124: ISheetData_Activity_GameTask;
	25030125: ISheetData_Activity_GameTask;
	25030126: ISheetData_Activity_GameTask;
	25030127: ISheetData_Activity_GameTask;
	25030128: ISheetData_Activity_GameTask;
	25030129: ISheetData_Activity_GameTask;
	25030130: ISheetData_Activity_GameTask;
	25030131: ISheetData_Activity_GameTask;
	25030132: ISheetData_Activity_GameTask;
	25030133: ISheetData_Activity_GameTask;
	25030134: ISheetData_Activity_GameTask;
	25030135: ISheetData_Activity_GameTask;
	25030136: ISheetData_Activity_GameTask;
	25030137: ISheetData_Activity_GameTask;
	25030138: ISheetData_Activity_GameTask;
	25030139: ISheetData_Activity_GameTask;
	25030140: ISheetData_Activity_GameTask;
	25030141: ISheetData_Activity_GameTask;
	25030142: ISheetData_Activity_GameTask;
	25030143: ISheetData_Activity_GameTask;
	25030144: ISheetData_Activity_GameTask;
	25030145: ISheetData_Activity_GameTask;
	25030146: ISheetData_Activity_GameTask;
	25030147: ISheetData_Activity_GameTask;
	25030148: ISheetData_Activity_GameTask;
	25030149: ISheetData_Activity_GameTask;
	25060201: ISheetData_Activity_GameTask;
	25060202: ISheetData_Activity_GameTask;
	25060203: ISheetData_Activity_GameTask;
	25060204: ISheetData_Activity_GameTask;
	25060205: ISheetData_Activity_GameTask;
	25060206: ISheetData_Activity_GameTask;
}
declare interface ISheetData_Activity_GameTask {
	/** 活动任务id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
	/** 隐藏奖励 */
	hidden_reward: string;
	/** 限制ID source_limit表 */
	limit_id: number;
	/** 维护用字段，将任务转变为不可见不可领状态 */
	deprecated: number;
}
//#endregion

//#region game_point --- unique
declare interface ISheet_Activity_GamePoint {
	rows: ISheetData_Activity_GamePoint[];
	1014001: ISheetData_Activity_GamePoint;
	1014002: ISheetData_Activity_GamePoint;
	1014003: ISheetData_Activity_GamePoint;
	1014004: ISheetData_Activity_GamePoint;
	1014005: ISheetData_Activity_GamePoint;
	1014006: ISheetData_Activity_GamePoint;
	1014007: ISheetData_Activity_GamePoint;
	1014008: ISheetData_Activity_GamePoint;
	1014009: ISheetData_Activity_GamePoint;
	1014010: ISheetData_Activity_GamePoint;
	1014011: ISheetData_Activity_GamePoint;
	1014012: ISheetData_Activity_GamePoint;
	1014013: ISheetData_Activity_GamePoint;
	1014014: ISheetData_Activity_GamePoint;
	1014015: ISheetData_Activity_GamePoint;
	1014016: ISheetData_Activity_GamePoint;
	1014017: ISheetData_Activity_GamePoint;
	1014018: ISheetData_Activity_GamePoint;
	1014019: ISheetData_Activity_GamePoint;
	1014020: ISheetData_Activity_GamePoint;
	1014021: ISheetData_Activity_GamePoint;
	1014022: ISheetData_Activity_GamePoint;
	1014023: ISheetData_Activity_GamePoint;
	1014024: ISheetData_Activity_GamePoint;
	1014025: ISheetData_Activity_GamePoint;
	1014026: ISheetData_Activity_GamePoint;
	1014027: ISheetData_Activity_GamePoint;
	1014028: ISheetData_Activity_GamePoint;
	1014029: ISheetData_Activity_GamePoint;
	1014030: ISheetData_Activity_GamePoint;
	1014031: ISheetData_Activity_GamePoint;
	1014032: ISheetData_Activity_GamePoint;
	1014033: ISheetData_Activity_GamePoint;
	1014034: ISheetData_Activity_GamePoint;
	1014035: ISheetData_Activity_GamePoint;
	1014036: ISheetData_Activity_GamePoint;
	1125001: ISheetData_Activity_GamePoint;
	1125002: ISheetData_Activity_GamePoint;
	1125003: ISheetData_Activity_GamePoint;
	1125004: ISheetData_Activity_GamePoint;
	1125005: ISheetData_Activity_GamePoint;
	1125006: ISheetData_Activity_GamePoint;
	1125007: ISheetData_Activity_GamePoint;
	1125008: ISheetData_Activity_GamePoint;
	1125009: ISheetData_Activity_GamePoint;
	1125010: ISheetData_Activity_GamePoint;
	1125011: ISheetData_Activity_GamePoint;
	1125012: ISheetData_Activity_GamePoint;
	1125013: ISheetData_Activity_GamePoint;
	1125014: ISheetData_Activity_GamePoint;
	1125015: ISheetData_Activity_GamePoint;
	1125016: ISheetData_Activity_GamePoint;
	1125017: ISheetData_Activity_GamePoint;
	1125018: ISheetData_Activity_GamePoint;
	1125019: ISheetData_Activity_GamePoint;
	1125020: ISheetData_Activity_GamePoint;
	1125021: ISheetData_Activity_GamePoint;
	1125022: ISheetData_Activity_GamePoint;
	1125023: ISheetData_Activity_GamePoint;
	1125024: ISheetData_Activity_GamePoint;
	1125025: ISheetData_Activity_GamePoint;
	1125026: ISheetData_Activity_GamePoint;
	1125027: ISheetData_Activity_GamePoint;
	1125028: ISheetData_Activity_GamePoint;
	1125029: ISheetData_Activity_GamePoint;
	1125030: ISheetData_Activity_GamePoint;
	1125031: ISheetData_Activity_GamePoint;
	1125032: ISheetData_Activity_GamePoint;
	1135001: ISheetData_Activity_GamePoint;
	1135002: ISheetData_Activity_GamePoint;
	1135003: ISheetData_Activity_GamePoint;
	1135004: ISheetData_Activity_GamePoint;
	1135005: ISheetData_Activity_GamePoint;
	1135006: ISheetData_Activity_GamePoint;
	1135007: ISheetData_Activity_GamePoint;
	1135008: ISheetData_Activity_GamePoint;
	1135009: ISheetData_Activity_GamePoint;
	1135010: ISheetData_Activity_GamePoint;
	1135011: ISheetData_Activity_GamePoint;
	1135012: ISheetData_Activity_GamePoint;
	1135013: ISheetData_Activity_GamePoint;
	1135014: ISheetData_Activity_GamePoint;
	1135015: ISheetData_Activity_GamePoint;
	1135016: ISheetData_Activity_GamePoint;
	1135017: ISheetData_Activity_GamePoint;
	1135018: ISheetData_Activity_GamePoint;
	1135019: ISheetData_Activity_GamePoint;
	1135020: ISheetData_Activity_GamePoint;
	1135021: ISheetData_Activity_GamePoint;
	1135022: ISheetData_Activity_GamePoint;
	1135023: ISheetData_Activity_GamePoint;
	1135024: ISheetData_Activity_GamePoint;
	1135025: ISheetData_Activity_GamePoint;
	1135026: ISheetData_Activity_GamePoint;
	1135027: ISheetData_Activity_GamePoint;
	1135028: ISheetData_Activity_GamePoint;
	1135029: ISheetData_Activity_GamePoint;
	1135030: ISheetData_Activity_GamePoint;
	1135031: ISheetData_Activity_GamePoint;
	1135032: ISheetData_Activity_GamePoint;
	22120101: ISheetData_Activity_GamePoint;
	22120102: ISheetData_Activity_GamePoint;
	22120103: ISheetData_Activity_GamePoint;
	22120104: ISheetData_Activity_GamePoint;
	22120105: ISheetData_Activity_GamePoint;
	22120106: ISheetData_Activity_GamePoint;
	22120107: ISheetData_Activity_GamePoint;
	22120108: ISheetData_Activity_GamePoint;
	22120109: ISheetData_Activity_GamePoint;
	22120110: ISheetData_Activity_GamePoint;
	22120111: ISheetData_Activity_GamePoint;
	22120112: ISheetData_Activity_GamePoint;
	22120113: ISheetData_Activity_GamePoint;
	22120114: ISheetData_Activity_GamePoint;
	22120115: ISheetData_Activity_GamePoint;
	22120116: ISheetData_Activity_GamePoint;
	22120117: ISheetData_Activity_GamePoint;
	22120118: ISheetData_Activity_GamePoint;
	22120119: ISheetData_Activity_GamePoint;
	22120120: ISheetData_Activity_GamePoint;
	22120121: ISheetData_Activity_GamePoint;
	22120122: ISheetData_Activity_GamePoint;
	22120123: ISheetData_Activity_GamePoint;
	22120124: ISheetData_Activity_GamePoint;
	22120125: ISheetData_Activity_GamePoint;
	22120126: ISheetData_Activity_GamePoint;
	22120127: ISheetData_Activity_GamePoint;
	22120128: ISheetData_Activity_GamePoint;
	22120129: ISheetData_Activity_GamePoint;
	22120130: ISheetData_Activity_GamePoint;
	22120131: ISheetData_Activity_GamePoint;
	22120132: ISheetData_Activity_GamePoint;
	23115101: ISheetData_Activity_GamePoint;
	23115102: ISheetData_Activity_GamePoint;
	23115103: ISheetData_Activity_GamePoint;
	23115104: ISheetData_Activity_GamePoint;
	23115105: ISheetData_Activity_GamePoint;
	23115106: ISheetData_Activity_GamePoint;
	23115107: ISheetData_Activity_GamePoint;
	23115108: ISheetData_Activity_GamePoint;
	23115109: ISheetData_Activity_GamePoint;
	23115110: ISheetData_Activity_GamePoint;
	23115111: ISheetData_Activity_GamePoint;
	23115112: ISheetData_Activity_GamePoint;
	23115113: ISheetData_Activity_GamePoint;
	23115114: ISheetData_Activity_GamePoint;
	23115115: ISheetData_Activity_GamePoint;
	23115116: ISheetData_Activity_GamePoint;
	23115117: ISheetData_Activity_GamePoint;
	23115118: ISheetData_Activity_GamePoint;
	23115119: ISheetData_Activity_GamePoint;
	23115120: ISheetData_Activity_GamePoint;
	23115121: ISheetData_Activity_GamePoint;
	23115122: ISheetData_Activity_GamePoint;
	23115123: ISheetData_Activity_GamePoint;
	23115124: ISheetData_Activity_GamePoint;
	23115125: ISheetData_Activity_GamePoint;
	23115126: ISheetData_Activity_GamePoint;
	23115127: ISheetData_Activity_GamePoint;
	23115128: ISheetData_Activity_GamePoint;
	23115129: ISheetData_Activity_GamePoint;
	23115130: ISheetData_Activity_GamePoint;
	23115131: ISheetData_Activity_GamePoint;
	23115132: ISheetData_Activity_GamePoint;
}
declare interface ISheetData_Activity_GamePoint {
	id: number;
	/** 活动ID */
	activity_id: number;
	/** 分数ID */
	point_id: number;
	/** 分数 */
	point: number;
	/** 奖励ID */
	res_id: number;
	/** 奖励数量 */
	res_count: number;
	/** 第几天解锁 */
	unlock_day: number;
	/** 各节点0普通1突出 */
	node_mark: number;
	/** 显示的立绘差分 */
	image_mark: number;
}
//#endregion

//#region rank --- group
declare interface ISheet_Activity_Rank {
	rows: ISheetData_Activity_Rank[];
	1010: ISheetData_Activity_Rank[];
}
declare interface ISheetData_Activity_Rank {
	/** 活动ID */
	activity_id: number;
	/** 排行榜ID */
	leaderboard_id: number;
	/** 奖励ID */
	rank_reward_id: number;
	/** 上榜最低点数 */
	require_point: number;
}
//#endregion

//#region rank_reward --- group
declare interface ISheet_Activity_RankReward {
	rows: ISheetData_Activity_RankReward[];
	1010: ISheetData_Activity_RankReward[];
}
declare interface ISheetData_Activity_RankReward {
	id: number;
	/** 档位排名下界 */
	lower_rank_bound: number;
	/** 奖励列表 */
	reward: string;
}
//#endregion

//#region flip_task --- unique
declare interface ISheet_Activity_FlipTask {
	rows: ISheetData_Activity_FlipTask[];
	1020001: ISheetData_Activity_FlipTask;
	1020002: ISheetData_Activity_FlipTask;
	1020003: ISheetData_Activity_FlipTask;
	1020004: ISheetData_Activity_FlipTask;
	1020005: ISheetData_Activity_FlipTask;
	1020006: ISheetData_Activity_FlipTask;
	1020007: ISheetData_Activity_FlipTask;
	1020008: ISheetData_Activity_FlipTask;
	1020009: ISheetData_Activity_FlipTask;
	1020010: ISheetData_Activity_FlipTask;
	1020011: ISheetData_Activity_FlipTask;
	1020012: ISheetData_Activity_FlipTask;
	1020013: ISheetData_Activity_FlipTask;
	1020014: ISheetData_Activity_FlipTask;
	1020015: ISheetData_Activity_FlipTask;
	1020016: ISheetData_Activity_FlipTask;
	1020017: ISheetData_Activity_FlipTask;
	1020018: ISheetData_Activity_FlipTask;
	1020019: ISheetData_Activity_FlipTask;
	1020020: ISheetData_Activity_FlipTask;
	1020021: ISheetData_Activity_FlipTask;
	1020022: ISheetData_Activity_FlipTask;
	1020023: ISheetData_Activity_FlipTask;
	1020024: ISheetData_Activity_FlipTask;
	1020025: ISheetData_Activity_FlipTask;
	1020026: ISheetData_Activity_FlipTask;
	1020027: ISheetData_Activity_FlipTask;
	1020028: ISheetData_Activity_FlipTask;
	1020029: ISheetData_Activity_FlipTask;
	1020030: ISheetData_Activity_FlipTask;
	1020031: ISheetData_Activity_FlipTask;
	1020032: ISheetData_Activity_FlipTask;
	1020033: ISheetData_Activity_FlipTask;
	1020034: ISheetData_Activity_FlipTask;
	1020035: ISheetData_Activity_FlipTask;
	1020036: ISheetData_Activity_FlipTask;
	1028001: ISheetData_Activity_FlipTask;
	1028002: ISheetData_Activity_FlipTask;
	1028003: ISheetData_Activity_FlipTask;
	1028004: ISheetData_Activity_FlipTask;
	1028005: ISheetData_Activity_FlipTask;
	1028006: ISheetData_Activity_FlipTask;
	1028007: ISheetData_Activity_FlipTask;
	1028008: ISheetData_Activity_FlipTask;
	1028009: ISheetData_Activity_FlipTask;
	1028010: ISheetData_Activity_FlipTask;
	1028011: ISheetData_Activity_FlipTask;
	1028012: ISheetData_Activity_FlipTask;
	1028013: ISheetData_Activity_FlipTask;
	1028014: ISheetData_Activity_FlipTask;
	1028015: ISheetData_Activity_FlipTask;
	1028016: ISheetData_Activity_FlipTask;
	1028017: ISheetData_Activity_FlipTask;
	1028018: ISheetData_Activity_FlipTask;
	1028019: ISheetData_Activity_FlipTask;
	1028020: ISheetData_Activity_FlipTask;
	1028021: ISheetData_Activity_FlipTask;
	1028022: ISheetData_Activity_FlipTask;
	1028023: ISheetData_Activity_FlipTask;
	1028024: ISheetData_Activity_FlipTask;
	1028025: ISheetData_Activity_FlipTask;
	1028026: ISheetData_Activity_FlipTask;
	1028027: ISheetData_Activity_FlipTask;
	1028028: ISheetData_Activity_FlipTask;
	1028029: ISheetData_Activity_FlipTask;
	1028030: ISheetData_Activity_FlipTask;
	1028031: ISheetData_Activity_FlipTask;
	1028032: ISheetData_Activity_FlipTask;
	1028033: ISheetData_Activity_FlipTask;
	1028034: ISheetData_Activity_FlipTask;
	1028035: ISheetData_Activity_FlipTask;
	1028036: ISheetData_Activity_FlipTask;
	1037001: ISheetData_Activity_FlipTask;
	1037002: ISheetData_Activity_FlipTask;
	1037003: ISheetData_Activity_FlipTask;
	1037004: ISheetData_Activity_FlipTask;
	1037005: ISheetData_Activity_FlipTask;
	1037006: ISheetData_Activity_FlipTask;
	1037007: ISheetData_Activity_FlipTask;
	1037008: ISheetData_Activity_FlipTask;
	1037009: ISheetData_Activity_FlipTask;
	1037010: ISheetData_Activity_FlipTask;
	1037011: ISheetData_Activity_FlipTask;
	1037012: ISheetData_Activity_FlipTask;
	1037013: ISheetData_Activity_FlipTask;
	1037014: ISheetData_Activity_FlipTask;
	1037015: ISheetData_Activity_FlipTask;
	1037016: ISheetData_Activity_FlipTask;
	1037017: ISheetData_Activity_FlipTask;
	1037018: ISheetData_Activity_FlipTask;
	1037019: ISheetData_Activity_FlipTask;
	1037020: ISheetData_Activity_FlipTask;
	1037021: ISheetData_Activity_FlipTask;
	1037022: ISheetData_Activity_FlipTask;
	1037023: ISheetData_Activity_FlipTask;
	1037024: ISheetData_Activity_FlipTask;
	1037025: ISheetData_Activity_FlipTask;
	1037026: ISheetData_Activity_FlipTask;
	1037027: ISheetData_Activity_FlipTask;
	1037028: ISheetData_Activity_FlipTask;
	1037029: ISheetData_Activity_FlipTask;
	1037030: ISheetData_Activity_FlipTask;
	1037031: ISheetData_Activity_FlipTask;
	1037032: ISheetData_Activity_FlipTask;
	1037033: ISheetData_Activity_FlipTask;
	1037034: ISheetData_Activity_FlipTask;
	1037035: ISheetData_Activity_FlipTask;
	1037036: ISheetData_Activity_FlipTask;
	1070001: ISheetData_Activity_FlipTask;
	1070002: ISheetData_Activity_FlipTask;
	1070003: ISheetData_Activity_FlipTask;
	1070004: ISheetData_Activity_FlipTask;
	1070005: ISheetData_Activity_FlipTask;
	1070006: ISheetData_Activity_FlipTask;
	1070007: ISheetData_Activity_FlipTask;
	1070008: ISheetData_Activity_FlipTask;
	1070009: ISheetData_Activity_FlipTask;
	1070010: ISheetData_Activity_FlipTask;
	1070011: ISheetData_Activity_FlipTask;
	1070012: ISheetData_Activity_FlipTask;
	1070013: ISheetData_Activity_FlipTask;
	1070014: ISheetData_Activity_FlipTask;
	1070015: ISheetData_Activity_FlipTask;
	1070016: ISheetData_Activity_FlipTask;
	1070017: ISheetData_Activity_FlipTask;
	1070018: ISheetData_Activity_FlipTask;
	1070019: ISheetData_Activity_FlipTask;
	1070020: ISheetData_Activity_FlipTask;
	1070021: ISheetData_Activity_FlipTask;
	1070022: ISheetData_Activity_FlipTask;
	1070023: ISheetData_Activity_FlipTask;
	1070024: ISheetData_Activity_FlipTask;
	1070025: ISheetData_Activity_FlipTask;
	1070026: ISheetData_Activity_FlipTask;
	1070027: ISheetData_Activity_FlipTask;
	1070028: ISheetData_Activity_FlipTask;
	1070029: ISheetData_Activity_FlipTask;
	1070030: ISheetData_Activity_FlipTask;
	1070031: ISheetData_Activity_FlipTask;
	1070032: ISheetData_Activity_FlipTask;
	1070033: ISheetData_Activity_FlipTask;
	1070034: ISheetData_Activity_FlipTask;
	1070035: ISheetData_Activity_FlipTask;
	1070036: ISheetData_Activity_FlipTask;
	1104001: ISheetData_Activity_FlipTask;
	1104002: ISheetData_Activity_FlipTask;
	1104003: ISheetData_Activity_FlipTask;
	1104004: ISheetData_Activity_FlipTask;
	1104005: ISheetData_Activity_FlipTask;
	1104006: ISheetData_Activity_FlipTask;
	1104007: ISheetData_Activity_FlipTask;
	1104008: ISheetData_Activity_FlipTask;
	1104009: ISheetData_Activity_FlipTask;
	1104010: ISheetData_Activity_FlipTask;
	1104011: ISheetData_Activity_FlipTask;
	1104012: ISheetData_Activity_FlipTask;
	1104013: ISheetData_Activity_FlipTask;
	1104014: ISheetData_Activity_FlipTask;
	1104015: ISheetData_Activity_FlipTask;
	1104016: ISheetData_Activity_FlipTask;
	1104017: ISheetData_Activity_FlipTask;
	1104018: ISheetData_Activity_FlipTask;
	1104019: ISheetData_Activity_FlipTask;
	1104020: ISheetData_Activity_FlipTask;
	1104021: ISheetData_Activity_FlipTask;
	1104022: ISheetData_Activity_FlipTask;
	1104023: ISheetData_Activity_FlipTask;
	1104024: ISheetData_Activity_FlipTask;
	1104025: ISheetData_Activity_FlipTask;
	1104026: ISheetData_Activity_FlipTask;
	1104027: ISheetData_Activity_FlipTask;
	1104028: ISheetData_Activity_FlipTask;
	1104029: ISheetData_Activity_FlipTask;
	1104030: ISheetData_Activity_FlipTask;
	1104031: ISheetData_Activity_FlipTask;
	1104032: ISheetData_Activity_FlipTask;
	1104033: ISheetData_Activity_FlipTask;
	1104034: ISheetData_Activity_FlipTask;
	1104035: ISheetData_Activity_FlipTask;
	1104036: ISheetData_Activity_FlipTask;
	1215001: ISheetData_Activity_FlipTask;
	1215002: ISheetData_Activity_FlipTask;
	1215003: ISheetData_Activity_FlipTask;
	1215004: ISheetData_Activity_FlipTask;
	1215005: ISheetData_Activity_FlipTask;
	1215006: ISheetData_Activity_FlipTask;
	1215007: ISheetData_Activity_FlipTask;
	1215008: ISheetData_Activity_FlipTask;
	1215009: ISheetData_Activity_FlipTask;
	1215010: ISheetData_Activity_FlipTask;
	1215011: ISheetData_Activity_FlipTask;
	1215012: ISheetData_Activity_FlipTask;
	1215013: ISheetData_Activity_FlipTask;
	1215014: ISheetData_Activity_FlipTask;
	1215015: ISheetData_Activity_FlipTask;
	1215016: ISheetData_Activity_FlipTask;
	1215017: ISheetData_Activity_FlipTask;
	1215018: ISheetData_Activity_FlipTask;
	1215019: ISheetData_Activity_FlipTask;
	1215020: ISheetData_Activity_FlipTask;
	1215021: ISheetData_Activity_FlipTask;
	1215022: ISheetData_Activity_FlipTask;
	1215023: ISheetData_Activity_FlipTask;
	1215024: ISheetData_Activity_FlipTask;
	1215025: ISheetData_Activity_FlipTask;
	1215026: ISheetData_Activity_FlipTask;
	1215027: ISheetData_Activity_FlipTask;
	1215028: ISheetData_Activity_FlipTask;
	1215029: ISheetData_Activity_FlipTask;
	1215030: ISheetData_Activity_FlipTask;
	1215031: ISheetData_Activity_FlipTask;
	1215032: ISheetData_Activity_FlipTask;
	1215033: ISheetData_Activity_FlipTask;
	1215034: ISheetData_Activity_FlipTask;
	1215035: ISheetData_Activity_FlipTask;
	1215036: ISheetData_Activity_FlipTask;
	22090101: ISheetData_Activity_FlipTask;
	22090102: ISheetData_Activity_FlipTask;
	22090103: ISheetData_Activity_FlipTask;
	22090104: ISheetData_Activity_FlipTask;
	22090105: ISheetData_Activity_FlipTask;
	22090106: ISheetData_Activity_FlipTask;
	22090107: ISheetData_Activity_FlipTask;
	22090108: ISheetData_Activity_FlipTask;
	22090109: ISheetData_Activity_FlipTask;
	22090110: ISheetData_Activity_FlipTask;
	22090111: ISheetData_Activity_FlipTask;
	22090112: ISheetData_Activity_FlipTask;
	22090113: ISheetData_Activity_FlipTask;
	22090114: ISheetData_Activity_FlipTask;
	22090115: ISheetData_Activity_FlipTask;
	22090116: ISheetData_Activity_FlipTask;
	22090117: ISheetData_Activity_FlipTask;
	22090118: ISheetData_Activity_FlipTask;
	22090119: ISheetData_Activity_FlipTask;
	22090120: ISheetData_Activity_FlipTask;
	22090121: ISheetData_Activity_FlipTask;
	22090122: ISheetData_Activity_FlipTask;
	22090123: ISheetData_Activity_FlipTask;
	22090124: ISheetData_Activity_FlipTask;
	22090125: ISheetData_Activity_FlipTask;
	22090126: ISheetData_Activity_FlipTask;
	22090127: ISheetData_Activity_FlipTask;
	22090128: ISheetData_Activity_FlipTask;
	22090129: ISheetData_Activity_FlipTask;
	22090130: ISheetData_Activity_FlipTask;
	22090131: ISheetData_Activity_FlipTask;
	22090132: ISheetData_Activity_FlipTask;
	22090133: ISheetData_Activity_FlipTask;
	22090134: ISheetData_Activity_FlipTask;
	22090135: ISheetData_Activity_FlipTask;
	22090136: ISheetData_Activity_FlipTask;
	23070101: ISheetData_Activity_FlipTask;
	23070102: ISheetData_Activity_FlipTask;
	23070103: ISheetData_Activity_FlipTask;
	23070104: ISheetData_Activity_FlipTask;
	23070105: ISheetData_Activity_FlipTask;
	23070106: ISheetData_Activity_FlipTask;
	23070107: ISheetData_Activity_FlipTask;
	23070108: ISheetData_Activity_FlipTask;
	23070109: ISheetData_Activity_FlipTask;
	23070110: ISheetData_Activity_FlipTask;
	23070111: ISheetData_Activity_FlipTask;
	23070112: ISheetData_Activity_FlipTask;
	23070113: ISheetData_Activity_FlipTask;
	23070114: ISheetData_Activity_FlipTask;
	23070115: ISheetData_Activity_FlipTask;
	23070116: ISheetData_Activity_FlipTask;
	23070117: ISheetData_Activity_FlipTask;
	23070118: ISheetData_Activity_FlipTask;
	23070119: ISheetData_Activity_FlipTask;
	23070120: ISheetData_Activity_FlipTask;
	23070121: ISheetData_Activity_FlipTask;
	23070122: ISheetData_Activity_FlipTask;
	23070123: ISheetData_Activity_FlipTask;
	23070124: ISheetData_Activity_FlipTask;
	23070125: ISheetData_Activity_FlipTask;
	23070126: ISheetData_Activity_FlipTask;
	23070127: ISheetData_Activity_FlipTask;
	23070128: ISheetData_Activity_FlipTask;
	23070129: ISheetData_Activity_FlipTask;
	23070130: ISheetData_Activity_FlipTask;
	23070131: ISheetData_Activity_FlipTask;
	23070132: ISheetData_Activity_FlipTask;
	23070133: ISheetData_Activity_FlipTask;
	23070134: ISheetData_Activity_FlipTask;
	23070135: ISheetData_Activity_FlipTask;
	23070136: ISheetData_Activity_FlipTask;
	23125201: ISheetData_Activity_FlipTask;
	23125202: ISheetData_Activity_FlipTask;
	23125203: ISheetData_Activity_FlipTask;
	23125204: ISheetData_Activity_FlipTask;
	23125205: ISheetData_Activity_FlipTask;
	23125206: ISheetData_Activity_FlipTask;
	23125207: ISheetData_Activity_FlipTask;
	23125208: ISheetData_Activity_FlipTask;
	23125209: ISheetData_Activity_FlipTask;
	23125210: ISheetData_Activity_FlipTask;
	23125211: ISheetData_Activity_FlipTask;
	23125212: ISheetData_Activity_FlipTask;
	23125213: ISheetData_Activity_FlipTask;
	23125214: ISheetData_Activity_FlipTask;
	23125215: ISheetData_Activity_FlipTask;
	23125216: ISheetData_Activity_FlipTask;
	23125217: ISheetData_Activity_FlipTask;
	23125218: ISheetData_Activity_FlipTask;
	23125219: ISheetData_Activity_FlipTask;
	23125220: ISheetData_Activity_FlipTask;
	23125221: ISheetData_Activity_FlipTask;
	23125222: ISheetData_Activity_FlipTask;
	23125223: ISheetData_Activity_FlipTask;
	23125224: ISheetData_Activity_FlipTask;
	23125225: ISheetData_Activity_FlipTask;
	23125226: ISheetData_Activity_FlipTask;
	23125227: ISheetData_Activity_FlipTask;
	23125228: ISheetData_Activity_FlipTask;
	23125229: ISheetData_Activity_FlipTask;
	23125230: ISheetData_Activity_FlipTask;
	23125231: ISheetData_Activity_FlipTask;
	23125232: ISheetData_Activity_FlipTask;
	23125233: ISheetData_Activity_FlipTask;
	23125234: ISheetData_Activity_FlipTask;
	23125235: ISheetData_Activity_FlipTask;
	23125236: ISheetData_Activity_FlipTask;
	24086001: ISheetData_Activity_FlipTask;
	24086002: ISheetData_Activity_FlipTask;
	24086003: ISheetData_Activity_FlipTask;
	24086004: ISheetData_Activity_FlipTask;
	24086005: ISheetData_Activity_FlipTask;
	24086006: ISheetData_Activity_FlipTask;
	24086007: ISheetData_Activity_FlipTask;
	24086008: ISheetData_Activity_FlipTask;
	24086009: ISheetData_Activity_FlipTask;
	24086010: ISheetData_Activity_FlipTask;
	24086011: ISheetData_Activity_FlipTask;
	24086012: ISheetData_Activity_FlipTask;
	24086013: ISheetData_Activity_FlipTask;
	24086014: ISheetData_Activity_FlipTask;
	24086015: ISheetData_Activity_FlipTask;
	24086016: ISheetData_Activity_FlipTask;
	24086017: ISheetData_Activity_FlipTask;
	24086018: ISheetData_Activity_FlipTask;
	24086019: ISheetData_Activity_FlipTask;
	24086020: ISheetData_Activity_FlipTask;
	24086021: ISheetData_Activity_FlipTask;
	24086022: ISheetData_Activity_FlipTask;
	24086023: ISheetData_Activity_FlipTask;
	24086024: ISheetData_Activity_FlipTask;
	24086025: ISheetData_Activity_FlipTask;
	24086026: ISheetData_Activity_FlipTask;
	24086027: ISheetData_Activity_FlipTask;
	24086028: ISheetData_Activity_FlipTask;
	24086029: ISheetData_Activity_FlipTask;
	24086030: ISheetData_Activity_FlipTask;
	24086031: ISheetData_Activity_FlipTask;
	24086032: ISheetData_Activity_FlipTask;
	24086033: ISheetData_Activity_FlipTask;
	24086034: ISheetData_Activity_FlipTask;
	24086035: ISheetData_Activity_FlipTask;
	24086036: ISheetData_Activity_FlipTask;
	25079001: ISheetData_Activity_FlipTask;
	25079002: ISheetData_Activity_FlipTask;
	25079003: ISheetData_Activity_FlipTask;
	25079004: ISheetData_Activity_FlipTask;
	25079005: ISheetData_Activity_FlipTask;
	25079006: ISheetData_Activity_FlipTask;
	25079007: ISheetData_Activity_FlipTask;
	25079008: ISheetData_Activity_FlipTask;
	25079009: ISheetData_Activity_FlipTask;
	25079010: ISheetData_Activity_FlipTask;
	25079011: ISheetData_Activity_FlipTask;
	25079012: ISheetData_Activity_FlipTask;
	25079013: ISheetData_Activity_FlipTask;
	25079014: ISheetData_Activity_FlipTask;
	25079015: ISheetData_Activity_FlipTask;
	25079016: ISheetData_Activity_FlipTask;
	25079017: ISheetData_Activity_FlipTask;
	25079018: ISheetData_Activity_FlipTask;
	25079019: ISheetData_Activity_FlipTask;
	25079020: ISheetData_Activity_FlipTask;
	25079021: ISheetData_Activity_FlipTask;
	25079022: ISheetData_Activity_FlipTask;
	25079023: ISheetData_Activity_FlipTask;
	25079024: ISheetData_Activity_FlipTask;
	25079025: ISheetData_Activity_FlipTask;
	25079026: ISheetData_Activity_FlipTask;
	25079027: ISheetData_Activity_FlipTask;
	25079028: ISheetData_Activity_FlipTask;
	25079029: ISheetData_Activity_FlipTask;
	25079030: ISheetData_Activity_FlipTask;
	25079031: ISheetData_Activity_FlipTask;
	25079032: ISheetData_Activity_FlipTask;
	25079033: ISheetData_Activity_FlipTask;
	25079034: ISheetData_Activity_FlipTask;
	25079035: ISheetData_Activity_FlipTask;
	25079036: ISheetData_Activity_FlipTask;
	220501001: ISheetData_Activity_FlipTask;
	220501002: ISheetData_Activity_FlipTask;
	220501003: ISheetData_Activity_FlipTask;
	220501004: ISheetData_Activity_FlipTask;
	220501005: ISheetData_Activity_FlipTask;
	220501006: ISheetData_Activity_FlipTask;
	220501007: ISheetData_Activity_FlipTask;
	220501008: ISheetData_Activity_FlipTask;
	220501009: ISheetData_Activity_FlipTask;
	220501010: ISheetData_Activity_FlipTask;
	220501011: ISheetData_Activity_FlipTask;
	220501012: ISheetData_Activity_FlipTask;
	220501013: ISheetData_Activity_FlipTask;
	220501014: ISheetData_Activity_FlipTask;
	220501015: ISheetData_Activity_FlipTask;
	220501016: ISheetData_Activity_FlipTask;
	220501017: ISheetData_Activity_FlipTask;
	220501018: ISheetData_Activity_FlipTask;
	220501019: ISheetData_Activity_FlipTask;
	220501020: ISheetData_Activity_FlipTask;
	220501021: ISheetData_Activity_FlipTask;
	220501022: ISheetData_Activity_FlipTask;
	220501023: ISheetData_Activity_FlipTask;
	220501024: ISheetData_Activity_FlipTask;
	220501025: ISheetData_Activity_FlipTask;
	220501026: ISheetData_Activity_FlipTask;
	220501027: ISheetData_Activity_FlipTask;
	220501028: ISheetData_Activity_FlipTask;
	220501029: ISheetData_Activity_FlipTask;
	220501030: ISheetData_Activity_FlipTask;
	220501031: ISheetData_Activity_FlipTask;
	220501032: ISheetData_Activity_FlipTask;
	220501033: ISheetData_Activity_FlipTask;
	220501034: ISheetData_Activity_FlipTask;
	220501035: ISheetData_Activity_FlipTask;
	220501036: ISheetData_Activity_FlipTask;
}
declare interface ISheetData_Activity_FlipTask {
	/** 活动任务id */
	id: number;
	/** 活动ID */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励列表 */
	reward: string;
	/** 矩阵位置x */
	matrix_x: number;
	/** 矩阵位置y */
	matrix_y: number;
	/** 是否是奖励格 */
	is_reward: number;
}
//#endregion

//#region flip_info --- unique
declare interface ISheet_Activity_FlipInfo {
	rows: ISheetData_Activity_FlipInfo[];
	1022: ISheetData_Activity_FlipInfo;
	1028: ISheetData_Activity_FlipInfo;
	1037: ISheetData_Activity_FlipInfo;
	1070: ISheetData_Activity_FlipInfo;
	1104: ISheetData_Activity_FlipInfo;
	1215: ISheetData_Activity_FlipInfo;
	220501: ISheetData_Activity_FlipInfo;
	220901: ISheetData_Activity_FlipInfo;
	230701: ISheetData_Activity_FlipInfo;
	231252: ISheetData_Activity_FlipInfo;
	240860: ISheetData_Activity_FlipInfo;
	250790: ISheetData_Activity_FlipInfo;
}
declare interface ISheetData_Activity_FlipInfo {
	/** 活动ID */
	id: number;
	/** 每日翻牌次数 */
	flip_count: number;
	/** 初始任务列表 */
	init_task_list: string;
	/** 翻牌开始时间 */
	start_time: string;
	/** 翻牌结束时间（不影响领奖） */
	end_time: string;
}
//#endregion

//#region daily_sign --- group
declare interface ISheet_Activity_DailySign {
	rows: ISheetData_Activity_DailySign[];
	1038: ISheetData_Activity_DailySign[];
	1162: ISheetData_Activity_DailySign[];
	1165: ISheetData_Activity_DailySign[];
	1235: ISheetData_Activity_DailySign[];
	1295: ISheetData_Activity_DailySign[];
	220210: ISheetData_Activity_DailySign[];
	220309: ISheetData_Activity_DailySign[];
	220508: ISheetData_Activity_DailySign[];
	220911: ISheetData_Activity_DailySign[];
	221113: ISheetData_Activity_DailySign[];
	230401: ISheetData_Activity_DailySign[];
	230831: ISheetData_Activity_DailySign[];
	231101: ISheetData_Activity_DailySign[];
	231251: ISheetData_Activity_DailySign[];
	240351: ISheetData_Activity_DailySign[];
	240550: ISheetData_Activity_DailySign[];
	241091: ISheetData_Activity_DailySign[];
	241240: ISheetData_Activity_DailySign[];
	250391: ISheetData_Activity_DailySign[];
}
declare interface ISheetData_Activity_DailySign {
	/** 活动ID */
	activity_id: number;
	/** 奖励id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
	/** 自活动开始的天数 */
	day: number;
}
//#endregion

//#region richman_info --- unique
declare interface ISheet_Activity_RichmanInfo {
	rows: ISheetData_Activity_RichmanInfo[];
	1064: ISheetData_Activity_RichmanInfo;
	1073: ISheetData_Activity_RichmanInfo;
	1094: ISheetData_Activity_RichmanInfo;
	1246: ISheetData_Activity_RichmanInfo;
	241201: ISheetData_Activity_RichmanInfo;
}
declare interface ISheetData_Activity_RichmanInfo {
	/** 活动ID */
	activity_id: number;
	/** 活动地图ID */
	map_id: number;
	/** 地图长度 */
	map_distance: number;
	/** 活动宝箱 poolId */
	chest_id: number;
	/** 消耗道具id */
	consume_item_id: number;
	/** 消耗特殊道具id */
	special_item_id: number;
	/** 丢骰子获得的存款 */
	step_bank_save: number;
	/** 完成一圈获得存款 */
	finish_bank_save: number;
	/** 完成一圈获得的奖励序列 */
	finish_reward_seq: number;
	/** 用一次骰子的经验 */
	step_exp: number;
	/** 走完一圈的经验 */
	finish_exp: number;
	/** 物品价值表 */
	item_worth_pool: number;
	/** 最低每步收益 */
	min_avg_worth: number;
	/** 最高每步收益 */
	max_avg_worth: number;
	/** 宝箱序列 */
	chest_pool_seq: number;
}
//#endregion

//#region richman_map --- group
declare interface ISheet_Activity_RichmanMap {
	rows: ISheetData_Activity_RichmanMap[];
	106401: ISheetData_Activity_RichmanMap[];
	107301: ISheetData_Activity_RichmanMap[];
	109401: ISheetData_Activity_RichmanMap[];
	124601: ISheetData_Activity_RichmanMap[];
	24120101: ISheetData_Activity_RichmanMap[];
}
declare interface ISheetData_Activity_RichmanMap {
	/** 地图ID */
	map_id: number;
	/** 地图位置 */
	location: number;
	/** 格子坐标 */
	pos_x: number;
	pos_y: number;
	/** 面朝方向 */
	piece_face: number;
	/** 格子类型 */
	type: number;
	/** 参数 */
	param: number;
	/** 配置奖励类型 */
	bonus_type: number;
	/** 预期价值 */
	worth: number;
}
//#endregion

//#region richman_level --- group
declare interface ISheet_Activity_RichmanLevel {
	rows: ISheetData_Activity_RichmanLevel[];
	1064: ISheetData_Activity_RichmanLevel[];
	1073: ISheetData_Activity_RichmanLevel[];
	1094: ISheetData_Activity_RichmanLevel[];
	1246: ISheetData_Activity_RichmanLevel[];
	241201: ISheetData_Activity_RichmanLevel[];
}
declare interface ISheetData_Activity_RichmanLevel {
	/** 活动ID */
	activity_id: number;
	/** 名称 */
	name: string;
	/** 等级ID */
	id: number;
	/** 所需累积经验 */
	exp: number;
	/** 铜币加成（百分比整数） */
	buff: number;
}
//#endregion

//#region richman_event --- unique
declare interface ISheet_Activity_RichmanEvent {
	rows: ISheetData_Activity_RichmanEvent[];
	106401: ISheetData_Activity_RichmanEvent;
	106402: ISheetData_Activity_RichmanEvent;
	106403: ISheetData_Activity_RichmanEvent;
	106404: ISheetData_Activity_RichmanEvent;
	106405: ISheetData_Activity_RichmanEvent;
	106406: ISheetData_Activity_RichmanEvent;
	107301: ISheetData_Activity_RichmanEvent;
	107302: ISheetData_Activity_RichmanEvent;
	107303: ISheetData_Activity_RichmanEvent;
	107304: ISheetData_Activity_RichmanEvent;
	107305: ISheetData_Activity_RichmanEvent;
	107306: ISheetData_Activity_RichmanEvent;
	109401: ISheetData_Activity_RichmanEvent;
	109402: ISheetData_Activity_RichmanEvent;
	109403: ISheetData_Activity_RichmanEvent;
	109404: ISheetData_Activity_RichmanEvent;
	109405: ISheetData_Activity_RichmanEvent;
	109406: ISheetData_Activity_RichmanEvent;
	124601: ISheetData_Activity_RichmanEvent;
	124602: ISheetData_Activity_RichmanEvent;
	124603: ISheetData_Activity_RichmanEvent;
	124604: ISheetData_Activity_RichmanEvent;
	124605: ISheetData_Activity_RichmanEvent;
	124606: ISheetData_Activity_RichmanEvent;
	24120101: ISheetData_Activity_RichmanEvent;
	24120102: ISheetData_Activity_RichmanEvent;
	24120103: ISheetData_Activity_RichmanEvent;
	24120104: ISheetData_Activity_RichmanEvent;
	24120105: ISheetData_Activity_RichmanEvent;
	24120106: ISheetData_Activity_RichmanEvent;
}
declare interface ISheetData_Activity_RichmanEvent {
	/** event唯一标识 */
	event_id: number;
	/** 活动ID */
	activity_id: number;
	/** 事件类型 */
	event_type: number;
	/** 随机权重 */
	weight: number;
	param: number[];
}
//#endregion

//#region period_task --- unique
declare interface ISheet_Activity_PeriodTask {
	rows: ISheetData_Activity_PeriodTask[];
	1066001: ISheetData_Activity_PeriodTask;
	1066002: ISheetData_Activity_PeriodTask;
	1066003: ISheetData_Activity_PeriodTask;
	1066004: ISheetData_Activity_PeriodTask;
	1066005: ISheetData_Activity_PeriodTask;
	1066006: ISheetData_Activity_PeriodTask;
	1066007: ISheetData_Activity_PeriodTask;
	1066008: ISheetData_Activity_PeriodTask;
	1066009: ISheetData_Activity_PeriodTask;
	1066010: ISheetData_Activity_PeriodTask;
	1066011: ISheetData_Activity_PeriodTask;
	1066012: ISheetData_Activity_PeriodTask;
	1066013: ISheetData_Activity_PeriodTask;
	1066014: ISheetData_Activity_PeriodTask;
	1066015: ISheetData_Activity_PeriodTask;
	1075001: ISheetData_Activity_PeriodTask;
	1075002: ISheetData_Activity_PeriodTask;
	1075003: ISheetData_Activity_PeriodTask;
	1075004: ISheetData_Activity_PeriodTask;
	1075005: ISheetData_Activity_PeriodTask;
	1075006: ISheetData_Activity_PeriodTask;
	1075007: ISheetData_Activity_PeriodTask;
	1075008: ISheetData_Activity_PeriodTask;
	1075009: ISheetData_Activity_PeriodTask;
	1075010: ISheetData_Activity_PeriodTask;
	1075011: ISheetData_Activity_PeriodTask;
	1075012: ISheetData_Activity_PeriodTask;
	1075013: ISheetData_Activity_PeriodTask;
	1075014: ISheetData_Activity_PeriodTask;
	1075015: ISheetData_Activity_PeriodTask;
	1078001: ISheetData_Activity_PeriodTask;
	1092001: ISheetData_Activity_PeriodTask;
	1092002: ISheetData_Activity_PeriodTask;
	1092003: ISheetData_Activity_PeriodTask;
	1092004: ISheetData_Activity_PeriodTask;
	1092005: ISheetData_Activity_PeriodTask;
	1092006: ISheetData_Activity_PeriodTask;
	1092007: ISheetData_Activity_PeriodTask;
	1092008: ISheetData_Activity_PeriodTask;
	1092009: ISheetData_Activity_PeriodTask;
	1092010: ISheetData_Activity_PeriodTask;
	1092011: ISheetData_Activity_PeriodTask;
	1092012: ISheetData_Activity_PeriodTask;
	1093001: ISheetData_Activity_PeriodTask;
	1109001: ISheetData_Activity_PeriodTask;
	1109002: ISheetData_Activity_PeriodTask;
	1109003: ISheetData_Activity_PeriodTask;
	1109004: ISheetData_Activity_PeriodTask;
	1109005: ISheetData_Activity_PeriodTask;
	1109006: ISheetData_Activity_PeriodTask;
	1109007: ISheetData_Activity_PeriodTask;
	1109008: ISheetData_Activity_PeriodTask;
	1109009: ISheetData_Activity_PeriodTask;
	1109010: ISheetData_Activity_PeriodTask;
	1109011: ISheetData_Activity_PeriodTask;
	1109012: ISheetData_Activity_PeriodTask;
	1109013: ISheetData_Activity_PeriodTask;
	1109014: ISheetData_Activity_PeriodTask;
	1109015: ISheetData_Activity_PeriodTask;
	1109016: ISheetData_Activity_PeriodTask;
	1109017: ISheetData_Activity_PeriodTask;
	1177001: ISheetData_Activity_PeriodTask;
	1177002: ISheetData_Activity_PeriodTask;
	1177003: ISheetData_Activity_PeriodTask;
	1177004: ISheetData_Activity_PeriodTask;
	1177005: ISheetData_Activity_PeriodTask;
	1177006: ISheetData_Activity_PeriodTask;
	1177007: ISheetData_Activity_PeriodTask;
	1177008: ISheetData_Activity_PeriodTask;
	1177009: ISheetData_Activity_PeriodTask;
	1177010: ISheetData_Activity_PeriodTask;
	1177011: ISheetData_Activity_PeriodTask;
	1177012: ISheetData_Activity_PeriodTask;
	1177013: ISheetData_Activity_PeriodTask;
	1177014: ISheetData_Activity_PeriodTask;
	1177015: ISheetData_Activity_PeriodTask;
	1177016: ISheetData_Activity_PeriodTask;
	1177017: ISheetData_Activity_PeriodTask;
	1177018: ISheetData_Activity_PeriodTask;
	1177019: ISheetData_Activity_PeriodTask;
	1177020: ISheetData_Activity_PeriodTask;
	1177021: ISheetData_Activity_PeriodTask;
	1177022: ISheetData_Activity_PeriodTask;
	1177023: ISheetData_Activity_PeriodTask;
	1177024: ISheetData_Activity_PeriodTask;
	1177025: ISheetData_Activity_PeriodTask;
	1177026: ISheetData_Activity_PeriodTask;
	1177027: ISheetData_Activity_PeriodTask;
	1177028: ISheetData_Activity_PeriodTask;
	1177029: ISheetData_Activity_PeriodTask;
	1177030: ISheetData_Activity_PeriodTask;
	1177031: ISheetData_Activity_PeriodTask;
	1177032: ISheetData_Activity_PeriodTask;
	1177033: ISheetData_Activity_PeriodTask;
	1177034: ISheetData_Activity_PeriodTask;
	1177035: ISheetData_Activity_PeriodTask;
	1177036: ISheetData_Activity_PeriodTask;
	1177037: ISheetData_Activity_PeriodTask;
	1177038: ISheetData_Activity_PeriodTask;
	1177039: ISheetData_Activity_PeriodTask;
	1177040: ISheetData_Activity_PeriodTask;
	1177041: ISheetData_Activity_PeriodTask;
	1177042: ISheetData_Activity_PeriodTask;
	1177043: ISheetData_Activity_PeriodTask;
	1177044: ISheetData_Activity_PeriodTask;
	1177045: ISheetData_Activity_PeriodTask;
	1177046: ISheetData_Activity_PeriodTask;
	1177047: ISheetData_Activity_PeriodTask;
	1177048: ISheetData_Activity_PeriodTask;
	1178001: ISheetData_Activity_PeriodTask;
	1178002: ISheetData_Activity_PeriodTask;
	1178003: ISheetData_Activity_PeriodTask;
	1178004: ISheetData_Activity_PeriodTask;
	1178005: ISheetData_Activity_PeriodTask;
	1178006: ISheetData_Activity_PeriodTask;
	1178007: ISheetData_Activity_PeriodTask;
	1178008: ISheetData_Activity_PeriodTask;
	1178009: ISheetData_Activity_PeriodTask;
	1178010: ISheetData_Activity_PeriodTask;
	1178011: ISheetData_Activity_PeriodTask;
	1178012: ISheetData_Activity_PeriodTask;
	1178013: ISheetData_Activity_PeriodTask;
	1178014: ISheetData_Activity_PeriodTask;
	1178015: ISheetData_Activity_PeriodTask;
	1178016: ISheetData_Activity_PeriodTask;
	1178017: ISheetData_Activity_PeriodTask;
	1178018: ISheetData_Activity_PeriodTask;
	1178019: ISheetData_Activity_PeriodTask;
	1178020: ISheetData_Activity_PeriodTask;
	1178021: ISheetData_Activity_PeriodTask;
	1178022: ISheetData_Activity_PeriodTask;
	1178023: ISheetData_Activity_PeriodTask;
	1178024: ISheetData_Activity_PeriodTask;
	1178025: ISheetData_Activity_PeriodTask;
	1178026: ISheetData_Activity_PeriodTask;
	1178027: ISheetData_Activity_PeriodTask;
	1178028: ISheetData_Activity_PeriodTask;
	1178029: ISheetData_Activity_PeriodTask;
	1178030: ISheetData_Activity_PeriodTask;
	1228001: ISheetData_Activity_PeriodTask;
	1228002: ISheetData_Activity_PeriodTask;
	1228003: ISheetData_Activity_PeriodTask;
	1228004: ISheetData_Activity_PeriodTask;
	1228005: ISheetData_Activity_PeriodTask;
	1228006: ISheetData_Activity_PeriodTask;
	1228007: ISheetData_Activity_PeriodTask;
	1228008: ISheetData_Activity_PeriodTask;
	1228009: ISheetData_Activity_PeriodTask;
	1228010: ISheetData_Activity_PeriodTask;
	1228011: ISheetData_Activity_PeriodTask;
	1228012: ISheetData_Activity_PeriodTask;
	1228013: ISheetData_Activity_PeriodTask;
	1228014: ISheetData_Activity_PeriodTask;
	1228015: ISheetData_Activity_PeriodTask;
	1228016: ISheetData_Activity_PeriodTask;
	1228017: ISheetData_Activity_PeriodTask;
	1228018: ISheetData_Activity_PeriodTask;
	1228019: ISheetData_Activity_PeriodTask;
	1228020: ISheetData_Activity_PeriodTask;
	1228021: ISheetData_Activity_PeriodTask;
	1228022: ISheetData_Activity_PeriodTask;
	1228023: ISheetData_Activity_PeriodTask;
	1228024: ISheetData_Activity_PeriodTask;
	1228025: ISheetData_Activity_PeriodTask;
	1228026: ISheetData_Activity_PeriodTask;
	1228027: ISheetData_Activity_PeriodTask;
	1228028: ISheetData_Activity_PeriodTask;
	1248001: ISheetData_Activity_PeriodTask;
	1248002: ISheetData_Activity_PeriodTask;
	1248003: ISheetData_Activity_PeriodTask;
	1248004: ISheetData_Activity_PeriodTask;
	1248005: ISheetData_Activity_PeriodTask;
	1248006: ISheetData_Activity_PeriodTask;
	1248007: ISheetData_Activity_PeriodTask;
	1248008: ISheetData_Activity_PeriodTask;
	1248009: ISheetData_Activity_PeriodTask;
	1248010: ISheetData_Activity_PeriodTask;
	1248011: ISheetData_Activity_PeriodTask;
	1248012: ISheetData_Activity_PeriodTask;
	1248013: ISheetData_Activity_PeriodTask;
	1248014: ISheetData_Activity_PeriodTask;
	1248015: ISheetData_Activity_PeriodTask;
	22040301: ISheetData_Activity_PeriodTask;
	22040302: ISheetData_Activity_PeriodTask;
	22040303: ISheetData_Activity_PeriodTask;
	22040304: ISheetData_Activity_PeriodTask;
	22040305: ISheetData_Activity_PeriodTask;
	22040306: ISheetData_Activity_PeriodTask;
	22040307: ISheetData_Activity_PeriodTask;
	22040308: ISheetData_Activity_PeriodTask;
	22040309: ISheetData_Activity_PeriodTask;
	22040310: ISheetData_Activity_PeriodTask;
	22040311: ISheetData_Activity_PeriodTask;
	22040312: ISheetData_Activity_PeriodTask;
	22040313: ISheetData_Activity_PeriodTask;
	22040314: ISheetData_Activity_PeriodTask;
	22040315: ISheetData_Activity_PeriodTask;
	22040401: ISheetData_Activity_PeriodTask;
	22040402: ISheetData_Activity_PeriodTask;
	22040403: ISheetData_Activity_PeriodTask;
	22040404: ISheetData_Activity_PeriodTask;
	22040405: ISheetData_Activity_PeriodTask;
	22040406: ISheetData_Activity_PeriodTask;
	22040407: ISheetData_Activity_PeriodTask;
	22040408: ISheetData_Activity_PeriodTask;
	22040409: ISheetData_Activity_PeriodTask;
	22040410: ISheetData_Activity_PeriodTask;
	22040411: ISheetData_Activity_PeriodTask;
	22040412: ISheetData_Activity_PeriodTask;
	22040413: ISheetData_Activity_PeriodTask;
	22040414: ISheetData_Activity_PeriodTask;
	22040415: ISheetData_Activity_PeriodTask;
	22040416: ISheetData_Activity_PeriodTask;
	22040417: ISheetData_Activity_PeriodTask;
	22040418: ISheetData_Activity_PeriodTask;
	22040419: ISheetData_Activity_PeriodTask;
	22040420: ISheetData_Activity_PeriodTask;
	22040421: ISheetData_Activity_PeriodTask;
	22040422: ISheetData_Activity_PeriodTask;
	22040423: ISheetData_Activity_PeriodTask;
	22040424: ISheetData_Activity_PeriodTask;
	22040425: ISheetData_Activity_PeriodTask;
	22040426: ISheetData_Activity_PeriodTask;
	22040427: ISheetData_Activity_PeriodTask;
	22040428: ISheetData_Activity_PeriodTask;
	22040501: ISheetData_Activity_PeriodTask;
	22040502: ISheetData_Activity_PeriodTask;
	22040503: ISheetData_Activity_PeriodTask;
	22040504: ISheetData_Activity_PeriodTask;
	22040505: ISheetData_Activity_PeriodTask;
	22040506: ISheetData_Activity_PeriodTask;
	22040507: ISheetData_Activity_PeriodTask;
	22040508: ISheetData_Activity_PeriodTask;
	22040509: ISheetData_Activity_PeriodTask;
	22040510: ISheetData_Activity_PeriodTask;
	22040511: ISheetData_Activity_PeriodTask;
	22040512: ISheetData_Activity_PeriodTask;
	22040513: ISheetData_Activity_PeriodTask;
	22040514: ISheetData_Activity_PeriodTask;
	22040515: ISheetData_Activity_PeriodTask;
	22040516: ISheetData_Activity_PeriodTask;
	22040517: ISheetData_Activity_PeriodTask;
	22040518: ISheetData_Activity_PeriodTask;
	22040519: ISheetData_Activity_PeriodTask;
	22040520: ISheetData_Activity_PeriodTask;
	22040521: ISheetData_Activity_PeriodTask;
	22040522: ISheetData_Activity_PeriodTask;
	22040523: ISheetData_Activity_PeriodTask;
	22040524: ISheetData_Activity_PeriodTask;
	22040525: ISheetData_Activity_PeriodTask;
	22040526: ISheetData_Activity_PeriodTask;
	22040527: ISheetData_Activity_PeriodTask;
	22040528: ISheetData_Activity_PeriodTask;
	22040529: ISheetData_Activity_PeriodTask;
	22040530: ISheetData_Activity_PeriodTask;
	22040531: ISheetData_Activity_PeriodTask;
	22040532: ISheetData_Activity_PeriodTask;
	22040533: ISheetData_Activity_PeriodTask;
	22040534: ISheetData_Activity_PeriodTask;
	22040535: ISheetData_Activity_PeriodTask;
	22040536: ISheetData_Activity_PeriodTask;
	22040537: ISheetData_Activity_PeriodTask;
	22040538: ISheetData_Activity_PeriodTask;
	22040539: ISheetData_Activity_PeriodTask;
	22040540: ISheetData_Activity_PeriodTask;
	22040541: ISheetData_Activity_PeriodTask;
	22040542: ISheetData_Activity_PeriodTask;
	22040543: ISheetData_Activity_PeriodTask;
	22040544: ISheetData_Activity_PeriodTask;
	22040545: ISheetData_Activity_PeriodTask;
	22040546: ISheetData_Activity_PeriodTask;
	22040547: ISheetData_Activity_PeriodTask;
	22040548: ISheetData_Activity_PeriodTask;
	22040549: ISheetData_Activity_PeriodTask;
	22040550: ISheetData_Activity_PeriodTask;
	22071101: ISheetData_Activity_PeriodTask;
	22071102: ISheetData_Activity_PeriodTask;
	22071103: ISheetData_Activity_PeriodTask;
	22071201: ISheetData_Activity_PeriodTask;
	22071202: ISheetData_Activity_PeriodTask;
	22071203: ISheetData_Activity_PeriodTask;
	22071204: ISheetData_Activity_PeriodTask;
	22071205: ISheetData_Activity_PeriodTask;
	22071206: ISheetData_Activity_PeriodTask;
	22081301: ISheetData_Activity_PeriodTask;
	22081302: ISheetData_Activity_PeriodTask;
	22081303: ISheetData_Activity_PeriodTask;
	22081304: ISheetData_Activity_PeriodTask;
	22081305: ISheetData_Activity_PeriodTask;
	22081306: ISheetData_Activity_PeriodTask;
	22081307: ISheetData_Activity_PeriodTask;
	22081308: ISheetData_Activity_PeriodTask;
	22081309: ISheetData_Activity_PeriodTask;
	22081310: ISheetData_Activity_PeriodTask;
	22081311: ISheetData_Activity_PeriodTask;
	22081312: ISheetData_Activity_PeriodTask;
	22081313: ISheetData_Activity_PeriodTask;
	22081314: ISheetData_Activity_PeriodTask;
	22081315: ISheetData_Activity_PeriodTask;
	22081316: ISheetData_Activity_PeriodTask;
	22081317: ISheetData_Activity_PeriodTask;
	22081318: ISheetData_Activity_PeriodTask;
	22081319: ISheetData_Activity_PeriodTask;
	22081320: ISheetData_Activity_PeriodTask;
	22081321: ISheetData_Activity_PeriodTask;
	22081322: ISheetData_Activity_PeriodTask;
	22081323: ISheetData_Activity_PeriodTask;
	22081324: ISheetData_Activity_PeriodTask;
	22081325: ISheetData_Activity_PeriodTask;
	22081326: ISheetData_Activity_PeriodTask;
	22081327: ISheetData_Activity_PeriodTask;
	22081328: ISheetData_Activity_PeriodTask;
	22081329: ISheetData_Activity_PeriodTask;
	22081330: ISheetData_Activity_PeriodTask;
	22081331: ISheetData_Activity_PeriodTask;
	22081332: ISheetData_Activity_PeriodTask;
	22081333: ISheetData_Activity_PeriodTask;
	22081334: ISheetData_Activity_PeriodTask;
	22081335: ISheetData_Activity_PeriodTask;
	22081336: ISheetData_Activity_PeriodTask;
	22081337: ISheetData_Activity_PeriodTask;
	22081338: ISheetData_Activity_PeriodTask;
	22081339: ISheetData_Activity_PeriodTask;
	22081340: ISheetData_Activity_PeriodTask;
	22081341: ISheetData_Activity_PeriodTask;
	22081342: ISheetData_Activity_PeriodTask;
	22081343: ISheetData_Activity_PeriodTask;
	22081344: ISheetData_Activity_PeriodTask;
	22081345: ISheetData_Activity_PeriodTask;
	22110301: ISheetData_Activity_PeriodTask;
	22110302: ISheetData_Activity_PeriodTask;
	22110303: ISheetData_Activity_PeriodTask;
	22110304: ISheetData_Activity_PeriodTask;
	22110305: ISheetData_Activity_PeriodTask;
	22110306: ISheetData_Activity_PeriodTask;
	22110307: ISheetData_Activity_PeriodTask;
	22110308: ISheetData_Activity_PeriodTask;
	22110309: ISheetData_Activity_PeriodTask;
	22110310: ISheetData_Activity_PeriodTask;
	22110311: ISheetData_Activity_PeriodTask;
	22110312: ISheetData_Activity_PeriodTask;
	22110313: ISheetData_Activity_PeriodTask;
	22110314: ISheetData_Activity_PeriodTask;
	22110315: ISheetData_Activity_PeriodTask;
	22110316: ISheetData_Activity_PeriodTask;
	22110317: ISheetData_Activity_PeriodTask;
	22110318: ISheetData_Activity_PeriodTask;
	22110319: ISheetData_Activity_PeriodTask;
	22110320: ISheetData_Activity_PeriodTask;
	22110321: ISheetData_Activity_PeriodTask;
	22110322: ISheetData_Activity_PeriodTask;
	22110323: ISheetData_Activity_PeriodTask;
	22110324: ISheetData_Activity_PeriodTask;
	22110401: ISheetData_Activity_PeriodTask;
	22110402: ISheetData_Activity_PeriodTask;
	22110403: ISheetData_Activity_PeriodTask;
	22110404: ISheetData_Activity_PeriodTask;
	22110405: ISheetData_Activity_PeriodTask;
	22110406: ISheetData_Activity_PeriodTask;
	22110407: ISheetData_Activity_PeriodTask;
	22110408: ISheetData_Activity_PeriodTask;
	22110409: ISheetData_Activity_PeriodTask;
	22110410: ISheetData_Activity_PeriodTask;
	22110411: ISheetData_Activity_PeriodTask;
	22110412: ISheetData_Activity_PeriodTask;
	22110413: ISheetData_Activity_PeriodTask;
	22110414: ISheetData_Activity_PeriodTask;
	22110415: ISheetData_Activity_PeriodTask;
	22110416: ISheetData_Activity_PeriodTask;
	22110417: ISheetData_Activity_PeriodTask;
	22110418: ISheetData_Activity_PeriodTask;
	22110419: ISheetData_Activity_PeriodTask;
	22110420: ISheetData_Activity_PeriodTask;
	22110421: ISheetData_Activity_PeriodTask;
	22110422: ISheetData_Activity_PeriodTask;
	22110423: ISheetData_Activity_PeriodTask;
	22110424: ISheetData_Activity_PeriodTask;
	22110425: ISheetData_Activity_PeriodTask;
	22110426: ISheetData_Activity_PeriodTask;
	22110427: ISheetData_Activity_PeriodTask;
	22110428: ISheetData_Activity_PeriodTask;
	22110429: ISheetData_Activity_PeriodTask;
	22110430: ISheetData_Activity_PeriodTask;
	22110431: ISheetData_Activity_PeriodTask;
	22110432: ISheetData_Activity_PeriodTask;
	22110433: ISheetData_Activity_PeriodTask;
	22110434: ISheetData_Activity_PeriodTask;
	22110435: ISheetData_Activity_PeriodTask;
	22110436: ISheetData_Activity_PeriodTask;
	22110437: ISheetData_Activity_PeriodTask;
	22110438: ISheetData_Activity_PeriodTask;
	22110439: ISheetData_Activity_PeriodTask;
	22110440: ISheetData_Activity_PeriodTask;
	22110441: ISheetData_Activity_PeriodTask;
	22110442: ISheetData_Activity_PeriodTask;
	22110443: ISheetData_Activity_PeriodTask;
	22110444: ISheetData_Activity_PeriodTask;
	22110445: ISheetData_Activity_PeriodTask;
	22110446: ISheetData_Activity_PeriodTask;
	22110447: ISheetData_Activity_PeriodTask;
	22110448: ISheetData_Activity_PeriodTask;
	22110449: ISheetData_Activity_PeriodTask;
	22110450: ISheetData_Activity_PeriodTask;
	22110451: ISheetData_Activity_PeriodTask;
	22110452: ISheetData_Activity_PeriodTask;
	22110453: ISheetData_Activity_PeriodTask;
	22110454: ISheetData_Activity_PeriodTask;
	23040401: ISheetData_Activity_PeriodTask;
	23040402: ISheetData_Activity_PeriodTask;
	23040403: ISheetData_Activity_PeriodTask;
	23040404: ISheetData_Activity_PeriodTask;
	23040405: ISheetData_Activity_PeriodTask;
	23040406: ISheetData_Activity_PeriodTask;
	23040407: ISheetData_Activity_PeriodTask;
	23040408: ISheetData_Activity_PeriodTask;
	23040409: ISheetData_Activity_PeriodTask;
	23040410: ISheetData_Activity_PeriodTask;
	23040411: ISheetData_Activity_PeriodTask;
	23040412: ISheetData_Activity_PeriodTask;
	23040413: ISheetData_Activity_PeriodTask;
	23040414: ISheetData_Activity_PeriodTask;
	23040415: ISheetData_Activity_PeriodTask;
	23040416: ISheetData_Activity_PeriodTask;
	23040417: ISheetData_Activity_PeriodTask;
	23040418: ISheetData_Activity_PeriodTask;
	23040419: ISheetData_Activity_PeriodTask;
	23040420: ISheetData_Activity_PeriodTask;
	23040421: ISheetData_Activity_PeriodTask;
	23040422: ISheetData_Activity_PeriodTask;
	23040423: ISheetData_Activity_PeriodTask;
	23040424: ISheetData_Activity_PeriodTask;
	23040501: ISheetData_Activity_PeriodTask;
	23040502: ISheetData_Activity_PeriodTask;
	23040503: ISheetData_Activity_PeriodTask;
	23040504: ISheetData_Activity_PeriodTask;
	23040505: ISheetData_Activity_PeriodTask;
	23040506: ISheetData_Activity_PeriodTask;
	23040507: ISheetData_Activity_PeriodTask;
	23040508: ISheetData_Activity_PeriodTask;
	23040509: ISheetData_Activity_PeriodTask;
	23040510: ISheetData_Activity_PeriodTask;
	23040511: ISheetData_Activity_PeriodTask;
	23040512: ISheetData_Activity_PeriodTask;
	23040513: ISheetData_Activity_PeriodTask;
	23040514: ISheetData_Activity_PeriodTask;
	23040515: ISheetData_Activity_PeriodTask;
	23040516: ISheetData_Activity_PeriodTask;
	23040517: ISheetData_Activity_PeriodTask;
	23040518: ISheetData_Activity_PeriodTask;
	23040519: ISheetData_Activity_PeriodTask;
	23040520: ISheetData_Activity_PeriodTask;
	23040521: ISheetData_Activity_PeriodTask;
	23040522: ISheetData_Activity_PeriodTask;
	23040523: ISheetData_Activity_PeriodTask;
	23040524: ISheetData_Activity_PeriodTask;
	23040525: ISheetData_Activity_PeriodTask;
	23040526: ISheetData_Activity_PeriodTask;
	23040527: ISheetData_Activity_PeriodTask;
	23040528: ISheetData_Activity_PeriodTask;
	23040529: ISheetData_Activity_PeriodTask;
	23040530: ISheetData_Activity_PeriodTask;
	23040531: ISheetData_Activity_PeriodTask;
	23040532: ISheetData_Activity_PeriodTask;
	23040533: ISheetData_Activity_PeriodTask;
	23040534: ISheetData_Activity_PeriodTask;
	23040535: ISheetData_Activity_PeriodTask;
	23040536: ISheetData_Activity_PeriodTask;
	23040537: ISheetData_Activity_PeriodTask;
	23040538: ISheetData_Activity_PeriodTask;
	23040539: ISheetData_Activity_PeriodTask;
	23040540: ISheetData_Activity_PeriodTask;
	23040541: ISheetData_Activity_PeriodTask;
	23040542: ISheetData_Activity_PeriodTask;
	23040543: ISheetData_Activity_PeriodTask;
	23040544: ISheetData_Activity_PeriodTask;
	23040545: ISheetData_Activity_PeriodTask;
	23040546: ISheetData_Activity_PeriodTask;
	23040547: ISheetData_Activity_PeriodTask;
	23040548: ISheetData_Activity_PeriodTask;
	23040549: ISheetData_Activity_PeriodTask;
	23040550: ISheetData_Activity_PeriodTask;
	23040551: ISheetData_Activity_PeriodTask;
	23040552: ISheetData_Activity_PeriodTask;
	23040553: ISheetData_Activity_PeriodTask;
	23040554: ISheetData_Activity_PeriodTask;
	23060101: ISheetData_Activity_PeriodTask;
	23060102: ISheetData_Activity_PeriodTask;
	23060103: ISheetData_Activity_PeriodTask;
	23060104: ISheetData_Activity_PeriodTask;
	23060105: ISheetData_Activity_PeriodTask;
	23060106: ISheetData_Activity_PeriodTask;
	23060107: ISheetData_Activity_PeriodTask;
	23060108: ISheetData_Activity_PeriodTask;
	23060109: ISheetData_Activity_PeriodTask;
	23060110: ISheetData_Activity_PeriodTask;
	23060111: ISheetData_Activity_PeriodTask;
	23060112: ISheetData_Activity_PeriodTask;
	23060113: ISheetData_Activity_PeriodTask;
	23060114: ISheetData_Activity_PeriodTask;
	23060115: ISheetData_Activity_PeriodTask;
	23060116: ISheetData_Activity_PeriodTask;
	23060117: ISheetData_Activity_PeriodTask;
	23060118: ISheetData_Activity_PeriodTask;
	23060119: ISheetData_Activity_PeriodTask;
	23060120: ISheetData_Activity_PeriodTask;
	23060121: ISheetData_Activity_PeriodTask;
	23060122: ISheetData_Activity_PeriodTask;
	23061501: ISheetData_Activity_PeriodTask;
	23061502: ISheetData_Activity_PeriodTask;
	23061503: ISheetData_Activity_PeriodTask;
	23061504: ISheetData_Activity_PeriodTask;
	23062201: ISheetData_Activity_PeriodTask;
	23062202: ISheetData_Activity_PeriodTask;
	23062203: ISheetData_Activity_PeriodTask;
	23062301: ISheetData_Activity_PeriodTask;
	23062401: ISheetData_Activity_PeriodTask;
	23062402: ISheetData_Activity_PeriodTask;
	23062403: ISheetData_Activity_PeriodTask;
	23062404: ISheetData_Activity_PeriodTask;
	23062405: ISheetData_Activity_PeriodTask;
	23080201: ISheetData_Activity_PeriodTask;
	23080202: ISheetData_Activity_PeriodTask;
	23080203: ISheetData_Activity_PeriodTask;
	23080204: ISheetData_Activity_PeriodTask;
	23080205: ISheetData_Activity_PeriodTask;
	23080301: ISheetData_Activity_PeriodTask;
	23080302: ISheetData_Activity_PeriodTask;
	23080303: ISheetData_Activity_PeriodTask;
	23080304: ISheetData_Activity_PeriodTask;
	23080305: ISheetData_Activity_PeriodTask;
	23080306: ISheetData_Activity_PeriodTask;
	23080307: ISheetData_Activity_PeriodTask;
	23080308: ISheetData_Activity_PeriodTask;
	23080309: ISheetData_Activity_PeriodTask;
	23080310: ISheetData_Activity_PeriodTask;
	23080311: ISheetData_Activity_PeriodTask;
	23080312: ISheetData_Activity_PeriodTask;
	23080313: ISheetData_Activity_PeriodTask;
	23080314: ISheetData_Activity_PeriodTask;
	23080315: ISheetData_Activity_PeriodTask;
	23080316: ISheetData_Activity_PeriodTask;
	23080317: ISheetData_Activity_PeriodTask;
	23080318: ISheetData_Activity_PeriodTask;
	23080319: ISheetData_Activity_PeriodTask;
	23080320: ISheetData_Activity_PeriodTask;
	23080321: ISheetData_Activity_PeriodTask;
	23080322: ISheetData_Activity_PeriodTask;
	23080323: ISheetData_Activity_PeriodTask;
	23080324: ISheetData_Activity_PeriodTask;
	23080325: ISheetData_Activity_PeriodTask;
	23080326: ISheetData_Activity_PeriodTask;
	23080327: ISheetData_Activity_PeriodTask;
	23080328: ISheetData_Activity_PeriodTask;
	23080329: ISheetData_Activity_PeriodTask;
	23080330: ISheetData_Activity_PeriodTask;
	23080331: ISheetData_Activity_PeriodTask;
	23080332: ISheetData_Activity_PeriodTask;
	23080333: ISheetData_Activity_PeriodTask;
	23080334: ISheetData_Activity_PeriodTask;
	23080335: ISheetData_Activity_PeriodTask;
	23080336: ISheetData_Activity_PeriodTask;
	23080337: ISheetData_Activity_PeriodTask;
	23080338: ISheetData_Activity_PeriodTask;
	23080339: ISheetData_Activity_PeriodTask;
	23080340: ISheetData_Activity_PeriodTask;
	23080401: ISheetData_Activity_PeriodTask;
	23080402: ISheetData_Activity_PeriodTask;
	23091201: ISheetData_Activity_PeriodTask;
	23091202: ISheetData_Activity_PeriodTask;
	23091203: ISheetData_Activity_PeriodTask;
	23091204: ISheetData_Activity_PeriodTask;
	23091205: ISheetData_Activity_PeriodTask;
	23111301: ISheetData_Activity_PeriodTask;
	23111302: ISheetData_Activity_PeriodTask;
	23111303: ISheetData_Activity_PeriodTask;
	23111304: ISheetData_Activity_PeriodTask;
	23111305: ISheetData_Activity_PeriodTask;
	23111306: ISheetData_Activity_PeriodTask;
	23111307: ISheetData_Activity_PeriodTask;
	23111308: ISheetData_Activity_PeriodTask;
	23111309: ISheetData_Activity_PeriodTask;
	23111310: ISheetData_Activity_PeriodTask;
	23111311: ISheetData_Activity_PeriodTask;
	23111312: ISheetData_Activity_PeriodTask;
	23111313: ISheetData_Activity_PeriodTask;
	23111314: ISheetData_Activity_PeriodTask;
	23111315: ISheetData_Activity_PeriodTask;
	23111316: ISheetData_Activity_PeriodTask;
	23111317: ISheetData_Activity_PeriodTask;
	23111318: ISheetData_Activity_PeriodTask;
	23111319: ISheetData_Activity_PeriodTask;
	23111320: ISheetData_Activity_PeriodTask;
	23111321: ISheetData_Activity_PeriodTask;
	23111322: ISheetData_Activity_PeriodTask;
	23111323: ISheetData_Activity_PeriodTask;
	23111324: ISheetData_Activity_PeriodTask;
	23111401: ISheetData_Activity_PeriodTask;
	23111402: ISheetData_Activity_PeriodTask;
	23111403: ISheetData_Activity_PeriodTask;
	23111404: ISheetData_Activity_PeriodTask;
	23111405: ISheetData_Activity_PeriodTask;
	23111406: ISheetData_Activity_PeriodTask;
	23111407: ISheetData_Activity_PeriodTask;
	23111408: ISheetData_Activity_PeriodTask;
	23111409: ISheetData_Activity_PeriodTask;
	23111410: ISheetData_Activity_PeriodTask;
	23111411: ISheetData_Activity_PeriodTask;
	23111412: ISheetData_Activity_PeriodTask;
	23111413: ISheetData_Activity_PeriodTask;
	23111414: ISheetData_Activity_PeriodTask;
	23111415: ISheetData_Activity_PeriodTask;
	23111416: ISheetData_Activity_PeriodTask;
	23111417: ISheetData_Activity_PeriodTask;
	23111418: ISheetData_Activity_PeriodTask;
	23111419: ISheetData_Activity_PeriodTask;
	23111420: ISheetData_Activity_PeriodTask;
	23111421: ISheetData_Activity_PeriodTask;
	23111422: ISheetData_Activity_PeriodTask;
	23111423: ISheetData_Activity_PeriodTask;
	23111424: ISheetData_Activity_PeriodTask;
	23111425: ISheetData_Activity_PeriodTask;
	23111426: ISheetData_Activity_PeriodTask;
	23111427: ISheetData_Activity_PeriodTask;
	23111428: ISheetData_Activity_PeriodTask;
	23111429: ISheetData_Activity_PeriodTask;
	23111430: ISheetData_Activity_PeriodTask;
	23111431: ISheetData_Activity_PeriodTask;
	23111432: ISheetData_Activity_PeriodTask;
	23111433: ISheetData_Activity_PeriodTask;
	23111434: ISheetData_Activity_PeriodTask;
	23111435: ISheetData_Activity_PeriodTask;
	23111436: ISheetData_Activity_PeriodTask;
	23111437: ISheetData_Activity_PeriodTask;
	23111438: ISheetData_Activity_PeriodTask;
	23111439: ISheetData_Activity_PeriodTask;
	23111440: ISheetData_Activity_PeriodTask;
	23111441: ISheetData_Activity_PeriodTask;
	23111442: ISheetData_Activity_PeriodTask;
	23111443: ISheetData_Activity_PeriodTask;
	23111444: ISheetData_Activity_PeriodTask;
	23111445: ISheetData_Activity_PeriodTask;
	23111446: ISheetData_Activity_PeriodTask;
	23111447: ISheetData_Activity_PeriodTask;
	23111448: ISheetData_Activity_PeriodTask;
	23111449: ISheetData_Activity_PeriodTask;
	23111450: ISheetData_Activity_PeriodTask;
	23111451: ISheetData_Activity_PeriodTask;
	23111452: ISheetData_Activity_PeriodTask;
	23111453: ISheetData_Activity_PeriodTask;
	23111454: ISheetData_Activity_PeriodTask;
	23111455: ISheetData_Activity_PeriodTask;
	23111456: ISheetData_Activity_PeriodTask;
	23111457: ISheetData_Activity_PeriodTask;
	23111458: ISheetData_Activity_PeriodTask;
	23111459: ISheetData_Activity_PeriodTask;
	23120301: ISheetData_Activity_PeriodTask;
	23120302: ISheetData_Activity_PeriodTask;
	23120303: ISheetData_Activity_PeriodTask;
	23120401: ISheetData_Activity_PeriodTask;
	23120402: ISheetData_Activity_PeriodTask;
	23120403: ISheetData_Activity_PeriodTask;
	23120404: ISheetData_Activity_PeriodTask;
	23120405: ISheetData_Activity_PeriodTask;
	23120406: ISheetData_Activity_PeriodTask;
	23120407: ISheetData_Activity_PeriodTask;
	23120408: ISheetData_Activity_PeriodTask;
	23120409: ISheetData_Activity_PeriodTask;
	23120410: ISheetData_Activity_PeriodTask;
	23120411: ISheetData_Activity_PeriodTask;
	23120412: ISheetData_Activity_PeriodTask;
	23120413: ISheetData_Activity_PeriodTask;
	23120414: ISheetData_Activity_PeriodTask;
	23120415: ISheetData_Activity_PeriodTask;
	23120416: ISheetData_Activity_PeriodTask;
	23120417: ISheetData_Activity_PeriodTask;
	23120418: ISheetData_Activity_PeriodTask;
	23120419: ISheetData_Activity_PeriodTask;
	23120420: ISheetData_Activity_PeriodTask;
	23120421: ISheetData_Activity_PeriodTask;
	23120422: ISheetData_Activity_PeriodTask;
	23120423: ISheetData_Activity_PeriodTask;
	23120424: ISheetData_Activity_PeriodTask;
	23120425: ISheetData_Activity_PeriodTask;
	23120426: ISheetData_Activity_PeriodTask;
	23120427: ISheetData_Activity_PeriodTask;
	23120428: ISheetData_Activity_PeriodTask;
	23120429: ISheetData_Activity_PeriodTask;
	23120430: ISheetData_Activity_PeriodTask;
	23120431: ISheetData_Activity_PeriodTask;
	23120432: ISheetData_Activity_PeriodTask;
	23120433: ISheetData_Activity_PeriodTask;
	23120434: ISheetData_Activity_PeriodTask;
	23120435: ISheetData_Activity_PeriodTask;
	23120436: ISheetData_Activity_PeriodTask;
	23120437: ISheetData_Activity_PeriodTask;
	23120438: ISheetData_Activity_PeriodTask;
	24010301: ISheetData_Activity_PeriodTask;
	24010302: ISheetData_Activity_PeriodTask;
	24010303: ISheetData_Activity_PeriodTask;
	24010304: ISheetData_Activity_PeriodTask;
	24010305: ISheetData_Activity_PeriodTask;
	24010306: ISheetData_Activity_PeriodTask;
	24010307: ISheetData_Activity_PeriodTask;
	24010308: ISheetData_Activity_PeriodTask;
	24010309: ISheetData_Activity_PeriodTask;
	24010310: ISheetData_Activity_PeriodTask;
	24010311: ISheetData_Activity_PeriodTask;
	24010312: ISheetData_Activity_PeriodTask;
	24010313: ISheetData_Activity_PeriodTask;
	24010314: ISheetData_Activity_PeriodTask;
	24010315: ISheetData_Activity_PeriodTask;
	24010316: ISheetData_Activity_PeriodTask;
	24010317: ISheetData_Activity_PeriodTask;
	24010318: ISheetData_Activity_PeriodTask;
	24010319: ISheetData_Activity_PeriodTask;
	24010320: ISheetData_Activity_PeriodTask;
	24010321: ISheetData_Activity_PeriodTask;
	24010322: ISheetData_Activity_PeriodTask;
	24010323: ISheetData_Activity_PeriodTask;
	24010324: ISheetData_Activity_PeriodTask;
	24010350: ISheetData_Activity_PeriodTask;
	24010351: ISheetData_Activity_PeriodTask;
	24010352: ISheetData_Activity_PeriodTask;
	24010353: ISheetData_Activity_PeriodTask;
	24010354: ISheetData_Activity_PeriodTask;
	24010355: ISheetData_Activity_PeriodTask;
	24010356: ISheetData_Activity_PeriodTask;
	24010357: ISheetData_Activity_PeriodTask;
	24010358: ISheetData_Activity_PeriodTask;
	24010359: ISheetData_Activity_PeriodTask;
	24010360: ISheetData_Activity_PeriodTask;
	24010361: ISheetData_Activity_PeriodTask;
	24010362: ISheetData_Activity_PeriodTask;
	24010363: ISheetData_Activity_PeriodTask;
	24030101: ISheetData_Activity_PeriodTask;
	24030102: ISheetData_Activity_PeriodTask;
	24030103: ISheetData_Activity_PeriodTask;
	24030104: ISheetData_Activity_PeriodTask;
	24030105: ISheetData_Activity_PeriodTask;
	24030106: ISheetData_Activity_PeriodTask;
	24030107: ISheetData_Activity_PeriodTask;
	24030108: ISheetData_Activity_PeriodTask;
	24030109: ISheetData_Activity_PeriodTask;
	24030110: ISheetData_Activity_PeriodTask;
	24030111: ISheetData_Activity_PeriodTask;
	24030112: ISheetData_Activity_PeriodTask;
	24030113: ISheetData_Activity_PeriodTask;
	24030114: ISheetData_Activity_PeriodTask;
	24030115: ISheetData_Activity_PeriodTask;
	24030116: ISheetData_Activity_PeriodTask;
	24030117: ISheetData_Activity_PeriodTask;
	24030118: ISheetData_Activity_PeriodTask;
	24030119: ISheetData_Activity_PeriodTask;
	24030120: ISheetData_Activity_PeriodTask;
	24030121: ISheetData_Activity_PeriodTask;
	24030122: ISheetData_Activity_PeriodTask;
	24030123: ISheetData_Activity_PeriodTask;
	24030124: ISheetData_Activity_PeriodTask;
	24030125: ISheetData_Activity_PeriodTask;
	24030126: ISheetData_Activity_PeriodTask;
	24030127: ISheetData_Activity_PeriodTask;
	24030128: ISheetData_Activity_PeriodTask;
	24030129: ISheetData_Activity_PeriodTask;
	24030130: ISheetData_Activity_PeriodTask;
	24030201: ISheetData_Activity_PeriodTask;
	24030202: ISheetData_Activity_PeriodTask;
	24030203: ISheetData_Activity_PeriodTask;
	24030204: ISheetData_Activity_PeriodTask;
	24030205: ISheetData_Activity_PeriodTask;
	24030206: ISheetData_Activity_PeriodTask;
	24030207: ISheetData_Activity_PeriodTask;
	24030208: ISheetData_Activity_PeriodTask;
	24030209: ISheetData_Activity_PeriodTask;
	24030210: ISheetData_Activity_PeriodTask;
	24030211: ISheetData_Activity_PeriodTask;
	24030212: ISheetData_Activity_PeriodTask;
	24030213: ISheetData_Activity_PeriodTask;
	24030214: ISheetData_Activity_PeriodTask;
	24030215: ISheetData_Activity_PeriodTask;
	24030216: ISheetData_Activity_PeriodTask;
	24030217: ISheetData_Activity_PeriodTask;
	24030218: ISheetData_Activity_PeriodTask;
	24030219: ISheetData_Activity_PeriodTask;
	24030220: ISheetData_Activity_PeriodTask;
	24030221: ISheetData_Activity_PeriodTask;
	24030222: ISheetData_Activity_PeriodTask;
	24030223: ISheetData_Activity_PeriodTask;
	24030224: ISheetData_Activity_PeriodTask;
	24030225: ISheetData_Activity_PeriodTask;
	24030226: ISheetData_Activity_PeriodTask;
	24030227: ISheetData_Activity_PeriodTask;
	24030228: ISheetData_Activity_PeriodTask;
	24030229: ISheetData_Activity_PeriodTask;
	24030230: ISheetData_Activity_PeriodTask;
	24040301: ISheetData_Activity_PeriodTask;
	24040302: ISheetData_Activity_PeriodTask;
	24040303: ISheetData_Activity_PeriodTask;
	24040304: ISheetData_Activity_PeriodTask;
	24040305: ISheetData_Activity_PeriodTask;
	24040306: ISheetData_Activity_PeriodTask;
	24040307: ISheetData_Activity_PeriodTask;
	24040308: ISheetData_Activity_PeriodTask;
	24040309: ISheetData_Activity_PeriodTask;
	24040310: ISheetData_Activity_PeriodTask;
	24040311: ISheetData_Activity_PeriodTask;
	24040312: ISheetData_Activity_PeriodTask;
	24040313: ISheetData_Activity_PeriodTask;
	24040314: ISheetData_Activity_PeriodTask;
	24040315: ISheetData_Activity_PeriodTask;
	24040316: ISheetData_Activity_PeriodTask;
	24040317: ISheetData_Activity_PeriodTask;
	24040318: ISheetData_Activity_PeriodTask;
	24040319: ISheetData_Activity_PeriodTask;
	24040320: ISheetData_Activity_PeriodTask;
	24040321: ISheetData_Activity_PeriodTask;
	24040322: ISheetData_Activity_PeriodTask;
	24040323: ISheetData_Activity_PeriodTask;
	24040324: ISheetData_Activity_PeriodTask;
	24040325: ISheetData_Activity_PeriodTask;
	24040326: ISheetData_Activity_PeriodTask;
	24040327: ISheetData_Activity_PeriodTask;
	24040328: ISheetData_Activity_PeriodTask;
	24040329: ISheetData_Activity_PeriodTask;
	24040330: ISheetData_Activity_PeriodTask;
	24040331: ISheetData_Activity_PeriodTask;
	24040332: ISheetData_Activity_PeriodTask;
	24040333: ISheetData_Activity_PeriodTask;
	24040334: ISheetData_Activity_PeriodTask;
	24040335: ISheetData_Activity_PeriodTask;
	24040336: ISheetData_Activity_PeriodTask;
	24040337: ISheetData_Activity_PeriodTask;
	24040338: ISheetData_Activity_PeriodTask;
	24040339: ISheetData_Activity_PeriodTask;
	24040340: ISheetData_Activity_PeriodTask;
	24040341: ISheetData_Activity_PeriodTask;
	24040342: ISheetData_Activity_PeriodTask;
	24040343: ISheetData_Activity_PeriodTask;
	24040344: ISheetData_Activity_PeriodTask;
	24040345: ISheetData_Activity_PeriodTask;
	24040401: ISheetData_Activity_PeriodTask;
	24040402: ISheetData_Activity_PeriodTask;
	24040403: ISheetData_Activity_PeriodTask;
	24040404: ISheetData_Activity_PeriodTask;
	24040405: ISheetData_Activity_PeriodTask;
	24040406: ISheetData_Activity_PeriodTask;
	24040407: ISheetData_Activity_PeriodTask;
	24040408: ISheetData_Activity_PeriodTask;
	24040409: ISheetData_Activity_PeriodTask;
	24040410: ISheetData_Activity_PeriodTask;
	24040411: ISheetData_Activity_PeriodTask;
	24040412: ISheetData_Activity_PeriodTask;
	24040413: ISheetData_Activity_PeriodTask;
	24040414: ISheetData_Activity_PeriodTask;
	24040415: ISheetData_Activity_PeriodTask;
	24040416: ISheetData_Activity_PeriodTask;
	24040417: ISheetData_Activity_PeriodTask;
	24040418: ISheetData_Activity_PeriodTask;
	24040419: ISheetData_Activity_PeriodTask;
	24040420: ISheetData_Activity_PeriodTask;
	24040421: ISheetData_Activity_PeriodTask;
	24040422: ISheetData_Activity_PeriodTask;
	24040423: ISheetData_Activity_PeriodTask;
	24040424: ISheetData_Activity_PeriodTask;
	24040425: ISheetData_Activity_PeriodTask;
	24040426: ISheetData_Activity_PeriodTask;
	24040427: ISheetData_Activity_PeriodTask;
	24040428: ISheetData_Activity_PeriodTask;
	24040429: ISheetData_Activity_PeriodTask;
	24040430: ISheetData_Activity_PeriodTask;
	24040431: ISheetData_Activity_PeriodTask;
	24040432: ISheetData_Activity_PeriodTask;
	24040433: ISheetData_Activity_PeriodTask;
	24040434: ISheetData_Activity_PeriodTask;
	24040435: ISheetData_Activity_PeriodTask;
	24040436: ISheetData_Activity_PeriodTask;
	24040437: ISheetData_Activity_PeriodTask;
	24040438: ISheetData_Activity_PeriodTask;
	24040439: ISheetData_Activity_PeriodTask;
	24040440: ISheetData_Activity_PeriodTask;
	24040441: ISheetData_Activity_PeriodTask;
	24040442: ISheetData_Activity_PeriodTask;
	24045301: ISheetData_Activity_PeriodTask;
	24045302: ISheetData_Activity_PeriodTask;
	24045303: ISheetData_Activity_PeriodTask;
	24045401: ISheetData_Activity_PeriodTask;
	24045501: ISheetData_Activity_PeriodTask;
	24045502: ISheetData_Activity_PeriodTask;
	24045503: ISheetData_Activity_PeriodTask;
	24045504: ISheetData_Activity_PeriodTask;
	24045505: ISheetData_Activity_PeriodTask;
	24060301: ISheetData_Activity_PeriodTask;
	24060303: ISheetData_Activity_PeriodTask;
	24060304: ISheetData_Activity_PeriodTask;
	24060307: ISheetData_Activity_PeriodTask;
	24060308: ISheetData_Activity_PeriodTask;
	24060309: ISheetData_Activity_PeriodTask;
	24060311: ISheetData_Activity_PeriodTask;
	24060313: ISheetData_Activity_PeriodTask;
	24060314: ISheetData_Activity_PeriodTask;
	24060315: ISheetData_Activity_PeriodTask;
	24060316: ISheetData_Activity_PeriodTask;
	24060317: ISheetData_Activity_PeriodTask;
	24060318: ISheetData_Activity_PeriodTask;
	24060319: ISheetData_Activity_PeriodTask;
	24060320: ISheetData_Activity_PeriodTask;
	24060321: ISheetData_Activity_PeriodTask;
	24060322: ISheetData_Activity_PeriodTask;
	24060323: ISheetData_Activity_PeriodTask;
	24060324: ISheetData_Activity_PeriodTask;
	24060325: ISheetData_Activity_PeriodTask;
	24060326: ISheetData_Activity_PeriodTask;
	24060327: ISheetData_Activity_PeriodTask;
	24060328: ISheetData_Activity_PeriodTask;
	24060329: ISheetData_Activity_PeriodTask;
	24060330: ISheetData_Activity_PeriodTask;
	24060331: ISheetData_Activity_PeriodTask;
	24060332: ISheetData_Activity_PeriodTask;
	24060333: ISheetData_Activity_PeriodTask;
	24060334: ISheetData_Activity_PeriodTask;
	24060335: ISheetData_Activity_PeriodTask;
	24060336: ISheetData_Activity_PeriodTask;
	24060337: ISheetData_Activity_PeriodTask;
	24060338: ISheetData_Activity_PeriodTask;
	24060339: ISheetData_Activity_PeriodTask;
	24060340: ISheetData_Activity_PeriodTask;
	24060341: ISheetData_Activity_PeriodTask;
	24060342: ISheetData_Activity_PeriodTask;
	24060501: ISheetData_Activity_PeriodTask;
	24060502: ISheetData_Activity_PeriodTask;
	24060503: ISheetData_Activity_PeriodTask;
	24060504: ISheetData_Activity_PeriodTask;
	24060505: ISheetData_Activity_PeriodTask;
	24060506: ISheetData_Activity_PeriodTask;
	24060507: ISheetData_Activity_PeriodTask;
	24060508: ISheetData_Activity_PeriodTask;
	24060509: ISheetData_Activity_PeriodTask;
	24060601: ISheetData_Activity_PeriodTask;
	24060701: ISheetData_Activity_PeriodTask;
	24060702: ISheetData_Activity_PeriodTask;
	24060703: ISheetData_Activity_PeriodTask;
	24060704: ISheetData_Activity_PeriodTask;
	24060705: ISheetData_Activity_PeriodTask;
	24070201: ISheetData_Activity_PeriodTask;
	24070202: ISheetData_Activity_PeriodTask;
	24070203: ISheetData_Activity_PeriodTask;
	24070204: ISheetData_Activity_PeriodTask;
	24070205: ISheetData_Activity_PeriodTask;
	24070206: ISheetData_Activity_PeriodTask;
	24070207: ISheetData_Activity_PeriodTask;
	24070208: ISheetData_Activity_PeriodTask;
	24070209: ISheetData_Activity_PeriodTask;
	24070210: ISheetData_Activity_PeriodTask;
	24070211: ISheetData_Activity_PeriodTask;
	24070212: ISheetData_Activity_PeriodTask;
	24070213: ISheetData_Activity_PeriodTask;
	24070214: ISheetData_Activity_PeriodTask;
	24070215: ISheetData_Activity_PeriodTask;
	24070216: ISheetData_Activity_PeriodTask;
	24070217: ISheetData_Activity_PeriodTask;
	24070218: ISheetData_Activity_PeriodTask;
	24070219: ISheetData_Activity_PeriodTask;
	24070220: ISheetData_Activity_PeriodTask;
	24070221: ISheetData_Activity_PeriodTask;
	24070222: ISheetData_Activity_PeriodTask;
	24070223: ISheetData_Activity_PeriodTask;
	24070224: ISheetData_Activity_PeriodTask;
	24070225: ISheetData_Activity_PeriodTask;
	24070226: ISheetData_Activity_PeriodTask;
	24070227: ISheetData_Activity_PeriodTask;
	24070228: ISheetData_Activity_PeriodTask;
	24080201: ISheetData_Activity_PeriodTask;
	24080202: ISheetData_Activity_PeriodTask;
	24080203: ISheetData_Activity_PeriodTask;
	24080204: ISheetData_Activity_PeriodTask;
	24080205: ISheetData_Activity_PeriodTask;
	24080206: ISheetData_Activity_PeriodTask;
	24080207: ISheetData_Activity_PeriodTask;
	24080208: ISheetData_Activity_PeriodTask;
	24080209: ISheetData_Activity_PeriodTask;
	24080210: ISheetData_Activity_PeriodTask;
	24080211: ISheetData_Activity_PeriodTask;
	24080212: ISheetData_Activity_PeriodTask;
	24080213: ISheetData_Activity_PeriodTask;
	24080214: ISheetData_Activity_PeriodTask;
	24080215: ISheetData_Activity_PeriodTask;
	24080216: ISheetData_Activity_PeriodTask;
	24080217: ISheetData_Activity_PeriodTask;
	24080218: ISheetData_Activity_PeriodTask;
	24080219: ISheetData_Activity_PeriodTask;
	24080220: ISheetData_Activity_PeriodTask;
	24080221: ISheetData_Activity_PeriodTask;
	24080222: ISheetData_Activity_PeriodTask;
	24080223: ISheetData_Activity_PeriodTask;
	24080224: ISheetData_Activity_PeriodTask;
	24080225: ISheetData_Activity_PeriodTask;
	24080226: ISheetData_Activity_PeriodTask;
	24080227: ISheetData_Activity_PeriodTask;
	24080228: ISheetData_Activity_PeriodTask;
	24080229: ISheetData_Activity_PeriodTask;
	24080230: ISheetData_Activity_PeriodTask;
	24080231: ISheetData_Activity_PeriodTask;
	24080232: ISheetData_Activity_PeriodTask;
	24080233: ISheetData_Activity_PeriodTask;
	24080234: ISheetData_Activity_PeriodTask;
	24080235: ISheetData_Activity_PeriodTask;
	24080236: ISheetData_Activity_PeriodTask;
	24080237: ISheetData_Activity_PeriodTask;
	24080238: ISheetData_Activity_PeriodTask;
	24080239: ISheetData_Activity_PeriodTask;
	24080240: ISheetData_Activity_PeriodTask;
	24080241: ISheetData_Activity_PeriodTask;
	24080242: ISheetData_Activity_PeriodTask;
	24080243: ISheetData_Activity_PeriodTask;
	24080244: ISheetData_Activity_PeriodTask;
	24080245: ISheetData_Activity_PeriodTask;
	24080246: ISheetData_Activity_PeriodTask;
	24080247: ISheetData_Activity_PeriodTask;
	24080248: ISheetData_Activity_PeriodTask;
	24080249: ISheetData_Activity_PeriodTask;
	24080250: ISheetData_Activity_PeriodTask;
	24080251: ISheetData_Activity_PeriodTask;
	24081201: ISheetData_Activity_PeriodTask;
	24081202: ISheetData_Activity_PeriodTask;
	24081203: ISheetData_Activity_PeriodTask;
	24081204: ISheetData_Activity_PeriodTask;
	24081205: ISheetData_Activity_PeriodTask;
	24081206: ISheetData_Activity_PeriodTask;
	24081207: ISheetData_Activity_PeriodTask;
	24081208: ISheetData_Activity_PeriodTask;
	24081301: ISheetData_Activity_PeriodTask;
	24081302: ISheetData_Activity_PeriodTask;
	24081303: ISheetData_Activity_PeriodTask;
	24081304: ISheetData_Activity_PeriodTask;
	24081501: ISheetData_Activity_PeriodTask;
	24081502: ISheetData_Activity_PeriodTask;
	24081503: ISheetData_Activity_PeriodTask;
	24081504: ISheetData_Activity_PeriodTask;
	24081505: ISheetData_Activity_PeriodTask;
	24081506: ISheetData_Activity_PeriodTask;
	24081507: ISheetData_Activity_PeriodTask;
	24081508: ISheetData_Activity_PeriodTask;
	24081509: ISheetData_Activity_PeriodTask;
	24081510: ISheetData_Activity_PeriodTask;
	24110401: ISheetData_Activity_PeriodTask;
	24110402: ISheetData_Activity_PeriodTask;
	24110403: ISheetData_Activity_PeriodTask;
	24110404: ISheetData_Activity_PeriodTask;
	24110405: ISheetData_Activity_PeriodTask;
	24110406: ISheetData_Activity_PeriodTask;
	24110407: ISheetData_Activity_PeriodTask;
	24110408: ISheetData_Activity_PeriodTask;
	24110409: ISheetData_Activity_PeriodTask;
	24110410: ISheetData_Activity_PeriodTask;
	24110411: ISheetData_Activity_PeriodTask;
	24110412: ISheetData_Activity_PeriodTask;
	24110413: ISheetData_Activity_PeriodTask;
	24110414: ISheetData_Activity_PeriodTask;
	24110415: ISheetData_Activity_PeriodTask;
	24110416: ISheetData_Activity_PeriodTask;
	24110417: ISheetData_Activity_PeriodTask;
	24110418: ISheetData_Activity_PeriodTask;
	24110419: ISheetData_Activity_PeriodTask;
	24110420: ISheetData_Activity_PeriodTask;
	24110421: ISheetData_Activity_PeriodTask;
	24110422: ISheetData_Activity_PeriodTask;
	24110423: ISheetData_Activity_PeriodTask;
	24110424: ISheetData_Activity_PeriodTask;
	24110425: ISheetData_Activity_PeriodTask;
	24110426: ISheetData_Activity_PeriodTask;
	24110427: ISheetData_Activity_PeriodTask;
	24110428: ISheetData_Activity_PeriodTask;
	24110429: ISheetData_Activity_PeriodTask;
	24110430: ISheetData_Activity_PeriodTask;
	24110431: ISheetData_Activity_PeriodTask;
	24110432: ISheetData_Activity_PeriodTask;
	24110433: ISheetData_Activity_PeriodTask;
	24110434: ISheetData_Activity_PeriodTask;
	24110435: ISheetData_Activity_PeriodTask;
	24110436: ISheetData_Activity_PeriodTask;
	24110437: ISheetData_Activity_PeriodTask;
	24110438: ISheetData_Activity_PeriodTask;
	24110439: ISheetData_Activity_PeriodTask;
	24110440: ISheetData_Activity_PeriodTask;
	24110441: ISheetData_Activity_PeriodTask;
	24110442: ISheetData_Activity_PeriodTask;
	24110443: ISheetData_Activity_PeriodTask;
	24110444: ISheetData_Activity_PeriodTask;
	24110445: ISheetData_Activity_PeriodTask;
	24110501: ISheetData_Activity_PeriodTask;
	24110502: ISheetData_Activity_PeriodTask;
	24110503: ISheetData_Activity_PeriodTask;
	24110504: ISheetData_Activity_PeriodTask;
	24110505: ISheetData_Activity_PeriodTask;
	24110506: ISheetData_Activity_PeriodTask;
	24110507: ISheetData_Activity_PeriodTask;
	24110508: ISheetData_Activity_PeriodTask;
	24110509: ISheetData_Activity_PeriodTask;
	24110510: ISheetData_Activity_PeriodTask;
	24110511: ISheetData_Activity_PeriodTask;
	24110512: ISheetData_Activity_PeriodTask;
	24110513: ISheetData_Activity_PeriodTask;
	24110514: ISheetData_Activity_PeriodTask;
	24110515: ISheetData_Activity_PeriodTask;
	24110516: ISheetData_Activity_PeriodTask;
	24110517: ISheetData_Activity_PeriodTask;
	24110518: ISheetData_Activity_PeriodTask;
	24110519: ISheetData_Activity_PeriodTask;
	24110520: ISheetData_Activity_PeriodTask;
	24110521: ISheetData_Activity_PeriodTask;
	24110522: ISheetData_Activity_PeriodTask;
	24110523: ISheetData_Activity_PeriodTask;
	24110524: ISheetData_Activity_PeriodTask;
	24110525: ISheetData_Activity_PeriodTask;
	24110526: ISheetData_Activity_PeriodTask;
	24110527: ISheetData_Activity_PeriodTask;
	24110528: ISheetData_Activity_PeriodTask;
	24110529: ISheetData_Activity_PeriodTask;
	24110530: ISheetData_Activity_PeriodTask;
	24110531: ISheetData_Activity_PeriodTask;
	24110532: ISheetData_Activity_PeriodTask;
	24110533: ISheetData_Activity_PeriodTask;
	24110534: ISheetData_Activity_PeriodTask;
	24110535: ISheetData_Activity_PeriodTask;
	24110536: ISheetData_Activity_PeriodTask;
	24110537: ISheetData_Activity_PeriodTask;
	24110538: ISheetData_Activity_PeriodTask;
	24110539: ISheetData_Activity_PeriodTask;
	24110540: ISheetData_Activity_PeriodTask;
	24110541: ISheetData_Activity_PeriodTask;
	24110542: ISheetData_Activity_PeriodTask;
	24110543: ISheetData_Activity_PeriodTask;
	24110544: ISheetData_Activity_PeriodTask;
	24110545: ISheetData_Activity_PeriodTask;
	24110546: ISheetData_Activity_PeriodTask;
	24110547: ISheetData_Activity_PeriodTask;
	24110548: ISheetData_Activity_PeriodTask;
	24110801: ISheetData_Activity_PeriodTask;
	24110802: ISheetData_Activity_PeriodTask;
	24110803: ISheetData_Activity_PeriodTask;
	24110804: ISheetData_Activity_PeriodTask;
	24110805: ISheetData_Activity_PeriodTask;
	24110806: ISheetData_Activity_PeriodTask;
	24110807: ISheetData_Activity_PeriodTask;
	24120301: ISheetData_Activity_PeriodTask;
	24120302: ISheetData_Activity_PeriodTask;
	24120303: ISheetData_Activity_PeriodTask;
	24120304: ISheetData_Activity_PeriodTask;
	24120305: ISheetData_Activity_PeriodTask;
	24120306: ISheetData_Activity_PeriodTask;
	24120307: ISheetData_Activity_PeriodTask;
	24120308: ISheetData_Activity_PeriodTask;
	24120309: ISheetData_Activity_PeriodTask;
	24120310: ISheetData_Activity_PeriodTask;
	24120311: ISheetData_Activity_PeriodTask;
	24120312: ISheetData_Activity_PeriodTask;
	24120313: ISheetData_Activity_PeriodTask;
	24120314: ISheetData_Activity_PeriodTask;
	24120315: ISheetData_Activity_PeriodTask;
	25010301: ISheetData_Activity_PeriodTask;
	25010302: ISheetData_Activity_PeriodTask;
	25010303: ISheetData_Activity_PeriodTask;
	25010304: ISheetData_Activity_PeriodTask;
	25010305: ISheetData_Activity_PeriodTask;
	25010306: ISheetData_Activity_PeriodTask;
	25010307: ISheetData_Activity_PeriodTask;
	25010308: ISheetData_Activity_PeriodTask;
	25010309: ISheetData_Activity_PeriodTask;
	25010310: ISheetData_Activity_PeriodTask;
	25010311: ISheetData_Activity_PeriodTask;
	25010312: ISheetData_Activity_PeriodTask;
	25010313: ISheetData_Activity_PeriodTask;
	25010314: ISheetData_Activity_PeriodTask;
	25010315: ISheetData_Activity_PeriodTask;
	25010316: ISheetData_Activity_PeriodTask;
	25010317: ISheetData_Activity_PeriodTask;
	25010318: ISheetData_Activity_PeriodTask;
	25010319: ISheetData_Activity_PeriodTask;
	25010320: ISheetData_Activity_PeriodTask;
	25010321: ISheetData_Activity_PeriodTask;
	25010322: ISheetData_Activity_PeriodTask;
	25010323: ISheetData_Activity_PeriodTask;
	25010324: ISheetData_Activity_PeriodTask;
	25010325: ISheetData_Activity_PeriodTask;
	25010326: ISheetData_Activity_PeriodTask;
	25010327: ISheetData_Activity_PeriodTask;
	25010328: ISheetData_Activity_PeriodTask;
	25010329: ISheetData_Activity_PeriodTask;
	25010330: ISheetData_Activity_PeriodTask;
	25010331: ISheetData_Activity_PeriodTask;
	25010332: ISheetData_Activity_PeriodTask;
	25010333: ISheetData_Activity_PeriodTask;
	25010334: ISheetData_Activity_PeriodTask;
	25010335: ISheetData_Activity_PeriodTask;
	25010336: ISheetData_Activity_PeriodTask;
	25010337: ISheetData_Activity_PeriodTask;
	25010338: ISheetData_Activity_PeriodTask;
	25010339: ISheetData_Activity_PeriodTask;
	25010340: ISheetData_Activity_PeriodTask;
	25010341: ISheetData_Activity_PeriodTask;
	25010342: ISheetData_Activity_PeriodTask;
	25010343: ISheetData_Activity_PeriodTask;
	25010344: ISheetData_Activity_PeriodTask;
	25010345: ISheetData_Activity_PeriodTask;
	25010346: ISheetData_Activity_PeriodTask;
	25010347: ISheetData_Activity_PeriodTask;
	25010348: ISheetData_Activity_PeriodTask;
	25010349: ISheetData_Activity_PeriodTask;
	25010350: ISheetData_Activity_PeriodTask;
	25010351: ISheetData_Activity_PeriodTask;
	25010352: ISheetData_Activity_PeriodTask;
	25010353: ISheetData_Activity_PeriodTask;
	25010354: ISheetData_Activity_PeriodTask;
	25010401: ISheetData_Activity_PeriodTask;
	25010402: ISheetData_Activity_PeriodTask;
	25010403: ISheetData_Activity_PeriodTask;
	25010404: ISheetData_Activity_PeriodTask;
	25010405: ISheetData_Activity_PeriodTask;
	25010406: ISheetData_Activity_PeriodTask;
	25010407: ISheetData_Activity_PeriodTask;
	25010408: ISheetData_Activity_PeriodTask;
	25010409: ISheetData_Activity_PeriodTask;
	25010410: ISheetData_Activity_PeriodTask;
	25010411: ISheetData_Activity_PeriodTask;
	25010412: ISheetData_Activity_PeriodTask;
	25010413: ISheetData_Activity_PeriodTask;
	25010414: ISheetData_Activity_PeriodTask;
	25010415: ISheetData_Activity_PeriodTask;
	25010416: ISheetData_Activity_PeriodTask;
	25010417: ISheetData_Activity_PeriodTask;
	25010418: ISheetData_Activity_PeriodTask;
	25010419: ISheetData_Activity_PeriodTask;
	25010420: ISheetData_Activity_PeriodTask;
	25010421: ISheetData_Activity_PeriodTask;
	25010422: ISheetData_Activity_PeriodTask;
	25010423: ISheetData_Activity_PeriodTask;
	25010424: ISheetData_Activity_PeriodTask;
	25010425: ISheetData_Activity_PeriodTask;
	25010426: ISheetData_Activity_PeriodTask;
	25010427: ISheetData_Activity_PeriodTask;
	25010428: ISheetData_Activity_PeriodTask;
	25010429: ISheetData_Activity_PeriodTask;
	25010430: ISheetData_Activity_PeriodTask;
	25010431: ISheetData_Activity_PeriodTask;
	25010432: ISheetData_Activity_PeriodTask;
	25010433: ISheetData_Activity_PeriodTask;
	25010434: ISheetData_Activity_PeriodTask;
	25010435: ISheetData_Activity_PeriodTask;
	25010436: ISheetData_Activity_PeriodTask;
	25010437: ISheetData_Activity_PeriodTask;
	25010438: ISheetData_Activity_PeriodTask;
	25010439: ISheetData_Activity_PeriodTask;
	25010440: ISheetData_Activity_PeriodTask;
	25010441: ISheetData_Activity_PeriodTask;
	25010442: ISheetData_Activity_PeriodTask;
	25011201: ISheetData_Activity_PeriodTask;
	25011202: ISheetData_Activity_PeriodTask;
	25011203: ISheetData_Activity_PeriodTask;
	25011204: ISheetData_Activity_PeriodTask;
	25011205: ISheetData_Activity_PeriodTask;
	25011206: ISheetData_Activity_PeriodTask;
	25011207: ISheetData_Activity_PeriodTask;
	25011208: ISheetData_Activity_PeriodTask;
	25011209: ISheetData_Activity_PeriodTask;
	25011210: ISheetData_Activity_PeriodTask;
	25011211: ISheetData_Activity_PeriodTask;
	25011212: ISheetData_Activity_PeriodTask;
	25011213: ISheetData_Activity_PeriodTask;
	25011214: ISheetData_Activity_PeriodTask;
	25020201: ISheetData_Activity_PeriodTask;
	25020202: ISheetData_Activity_PeriodTask;
	25020203: ISheetData_Activity_PeriodTask;
	25020204: ISheetData_Activity_PeriodTask;
	25020205: ISheetData_Activity_PeriodTask;
	25020206: ISheetData_Activity_PeriodTask;
	25020207: ISheetData_Activity_PeriodTask;
	25020208: ISheetData_Activity_PeriodTask;
	25020209: ISheetData_Activity_PeriodTask;
	25020210: ISheetData_Activity_PeriodTask;
	25020211: ISheetData_Activity_PeriodTask;
	25020212: ISheetData_Activity_PeriodTask;
	25020213: ISheetData_Activity_PeriodTask;
	25020214: ISheetData_Activity_PeriodTask;
	25020215: ISheetData_Activity_PeriodTask;
	25020216: ISheetData_Activity_PeriodTask;
	25020217: ISheetData_Activity_PeriodTask;
	25020218: ISheetData_Activity_PeriodTask;
	25020219: ISheetData_Activity_PeriodTask;
	25020220: ISheetData_Activity_PeriodTask;
	25020221: ISheetData_Activity_PeriodTask;
	25020222: ISheetData_Activity_PeriodTask;
	25020223: ISheetData_Activity_PeriodTask;
	25020224: ISheetData_Activity_PeriodTask;
	25020225: ISheetData_Activity_PeriodTask;
	25020226: ISheetData_Activity_PeriodTask;
	25020227: ISheetData_Activity_PeriodTask;
	25020228: ISheetData_Activity_PeriodTask;
	25040201: ISheetData_Activity_PeriodTask;
	25040202: ISheetData_Activity_PeriodTask;
	25040203: ISheetData_Activity_PeriodTask;
	25040204: ISheetData_Activity_PeriodTask;
	25040205: ISheetData_Activity_PeriodTask;
	25040206: ISheetData_Activity_PeriodTask;
	25040207: ISheetData_Activity_PeriodTask;
	25040208: ISheetData_Activity_PeriodTask;
	25040209: ISheetData_Activity_PeriodTask;
	25040210: ISheetData_Activity_PeriodTask;
	25040211: ISheetData_Activity_PeriodTask;
	25040212: ISheetData_Activity_PeriodTask;
	25040213: ISheetData_Activity_PeriodTask;
	25040214: ISheetData_Activity_PeriodTask;
	25040215: ISheetData_Activity_PeriodTask;
	25040216: ISheetData_Activity_PeriodTask;
	25040217: ISheetData_Activity_PeriodTask;
	25040218: ISheetData_Activity_PeriodTask;
	25040219: ISheetData_Activity_PeriodTask;
	25040220: ISheetData_Activity_PeriodTask;
	25040221: ISheetData_Activity_PeriodTask;
	25040222: ISheetData_Activity_PeriodTask;
	25040223: ISheetData_Activity_PeriodTask;
	25040224: ISheetData_Activity_PeriodTask;
	25040225: ISheetData_Activity_PeriodTask;
	25040226: ISheetData_Activity_PeriodTask;
	25040227: ISheetData_Activity_PeriodTask;
	25040228: ISheetData_Activity_PeriodTask;
	25040229: ISheetData_Activity_PeriodTask;
	25040230: ISheetData_Activity_PeriodTask;
	25040231: ISheetData_Activity_PeriodTask;
	25040232: ISheetData_Activity_PeriodTask;
	25040233: ISheetData_Activity_PeriodTask;
	25040234: ISheetData_Activity_PeriodTask;
	25040235: ISheetData_Activity_PeriodTask;
	25040236: ISheetData_Activity_PeriodTask;
	25040237: ISheetData_Activity_PeriodTask;
	25040238: ISheetData_Activity_PeriodTask;
	25040239: ISheetData_Activity_PeriodTask;
	25040240: ISheetData_Activity_PeriodTask;
	25040241: ISheetData_Activity_PeriodTask;
	25040242: ISheetData_Activity_PeriodTask;
	25040243: ISheetData_Activity_PeriodTask;
	25040244: ISheetData_Activity_PeriodTask;
	25040245: ISheetData_Activity_PeriodTask;
	25040301: ISheetData_Activity_PeriodTask;
	25040302: ISheetData_Activity_PeriodTask;
	25040303: ISheetData_Activity_PeriodTask;
	25040304: ISheetData_Activity_PeriodTask;
	25040305: ISheetData_Activity_PeriodTask;
	25040306: ISheetData_Activity_PeriodTask;
	25040307: ISheetData_Activity_PeriodTask;
	25040308: ISheetData_Activity_PeriodTask;
	25040309: ISheetData_Activity_PeriodTask;
	25040310: ISheetData_Activity_PeriodTask;
	25040311: ISheetData_Activity_PeriodTask;
	25040312: ISheetData_Activity_PeriodTask;
	25040313: ISheetData_Activity_PeriodTask;
	25040314: ISheetData_Activity_PeriodTask;
	25040315: ISheetData_Activity_PeriodTask;
	25040316: ISheetData_Activity_PeriodTask;
	25040317: ISheetData_Activity_PeriodTask;
	25040318: ISheetData_Activity_PeriodTask;
	25040319: ISheetData_Activity_PeriodTask;
	25040320: ISheetData_Activity_PeriodTask;
	25040321: ISheetData_Activity_PeriodTask;
	25040322: ISheetData_Activity_PeriodTask;
	25040323: ISheetData_Activity_PeriodTask;
	25040324: ISheetData_Activity_PeriodTask;
	25040325: ISheetData_Activity_PeriodTask;
	25040326: ISheetData_Activity_PeriodTask;
	25040327: ISheetData_Activity_PeriodTask;
	25040328: ISheetData_Activity_PeriodTask;
	25040329: ISheetData_Activity_PeriodTask;
	25040330: ISheetData_Activity_PeriodTask;
	25040331: ISheetData_Activity_PeriodTask;
	25040332: ISheetData_Activity_PeriodTask;
	25040333: ISheetData_Activity_PeriodTask;
	25040334: ISheetData_Activity_PeriodTask;
	25040335: ISheetData_Activity_PeriodTask;
	25040336: ISheetData_Activity_PeriodTask;
	25040337: ISheetData_Activity_PeriodTask;
	25040338: ISheetData_Activity_PeriodTask;
	25040339: ISheetData_Activity_PeriodTask;
	25040340: ISheetData_Activity_PeriodTask;
	25040341: ISheetData_Activity_PeriodTask;
	25040342: ISheetData_Activity_PeriodTask;
	25040343: ISheetData_Activity_PeriodTask;
	25040344: ISheetData_Activity_PeriodTask;
	25040345: ISheetData_Activity_PeriodTask;
	25060301: ISheetData_Activity_PeriodTask;
	25060302: ISheetData_Activity_PeriodTask;
	25060303: ISheetData_Activity_PeriodTask;
	25060401: ISheetData_Activity_PeriodTask;
	25060402: ISheetData_Activity_PeriodTask;
	25060403: ISheetData_Activity_PeriodTask;
	25060404: ISheetData_Activity_PeriodTask;
	25060405: ISheetData_Activity_PeriodTask;
	25060406: ISheetData_Activity_PeriodTask;
	25060407: ISheetData_Activity_PeriodTask;
	25060408: ISheetData_Activity_PeriodTask;
	25060409: ISheetData_Activity_PeriodTask;
	25060410: ISheetData_Activity_PeriodTask;
	25060411: ISheetData_Activity_PeriodTask;
	25060412: ISheetData_Activity_PeriodTask;
	25060413: ISheetData_Activity_PeriodTask;
	25060414: ISheetData_Activity_PeriodTask;
	25060415: ISheetData_Activity_PeriodTask;
	25060416: ISheetData_Activity_PeriodTask;
	25060417: ISheetData_Activity_PeriodTask;
	25060418: ISheetData_Activity_PeriodTask;
	25060419: ISheetData_Activity_PeriodTask;
	25060420: ISheetData_Activity_PeriodTask;
	25060421: ISheetData_Activity_PeriodTask;
	25060422: ISheetData_Activity_PeriodTask;
	25060423: ISheetData_Activity_PeriodTask;
	25060424: ISheetData_Activity_PeriodTask;
	25060425: ISheetData_Activity_PeriodTask;
	25060426: ISheetData_Activity_PeriodTask;
	25060427: ISheetData_Activity_PeriodTask;
	25060428: ISheetData_Activity_PeriodTask;
	25060429: ISheetData_Activity_PeriodTask;
	25060430: ISheetData_Activity_PeriodTask;
	25060431: ISheetData_Activity_PeriodTask;
	25060432: ISheetData_Activity_PeriodTask;
	25060433: ISheetData_Activity_PeriodTask;
	25060434: ISheetData_Activity_PeriodTask;
	25060435: ISheetData_Activity_PeriodTask;
	25060436: ISheetData_Activity_PeriodTask;
	25060437: ISheetData_Activity_PeriodTask;
	25060438: ISheetData_Activity_PeriodTask;
	25081201: ISheetData_Activity_PeriodTask;
	25081202: ISheetData_Activity_PeriodTask;
	25081203: ISheetData_Activity_PeriodTask;
	25081204: ISheetData_Activity_PeriodTask;
	25081205: ISheetData_Activity_PeriodTask;
	25081206: ISheetData_Activity_PeriodTask;
	25081207: ISheetData_Activity_PeriodTask;
	25081208: ISheetData_Activity_PeriodTask;
	25081209: ISheetData_Activity_PeriodTask;
	25081210: ISheetData_Activity_PeriodTask;
	25081211: ISheetData_Activity_PeriodTask;
	25081212: ISheetData_Activity_PeriodTask;
	25081213: ISheetData_Activity_PeriodTask;
	25081214: ISheetData_Activity_PeriodTask;
	25081215: ISheetData_Activity_PeriodTask;
	25081216: ISheetData_Activity_PeriodTask;
	25081217: ISheetData_Activity_PeriodTask;
	25081218: ISheetData_Activity_PeriodTask;
	25081219: ISheetData_Activity_PeriodTask;
	25081220: ISheetData_Activity_PeriodTask;
	25081221: ISheetData_Activity_PeriodTask;
	25082001: ISheetData_Activity_PeriodTask;
	25082002: ISheetData_Activity_PeriodTask;
	25082003: ISheetData_Activity_PeriodTask;
	25082004: ISheetData_Activity_PeriodTask;
	25082005: ISheetData_Activity_PeriodTask;
	25082006: ISheetData_Activity_PeriodTask;
	25082007: ISheetData_Activity_PeriodTask;
	25082008: ISheetData_Activity_PeriodTask;
	25082009: ISheetData_Activity_PeriodTask;
	25082010: ISheetData_Activity_PeriodTask;
	25082011: ISheetData_Activity_PeriodTask;
	25082012: ISheetData_Activity_PeriodTask;
	25082013: ISheetData_Activity_PeriodTask;
	25082014: ISheetData_Activity_PeriodTask;
	25082015: ISheetData_Activity_PeriodTask;
	25082016: ISheetData_Activity_PeriodTask;
	25082017: ISheetData_Activity_PeriodTask;
	25082018: ISheetData_Activity_PeriodTask;
	25082019: ISheetData_Activity_PeriodTask;
	25082020: ISheetData_Activity_PeriodTask;
	25082021: ISheetData_Activity_PeriodTask;
	25082022: ISheetData_Activity_PeriodTask;
	25082023: ISheetData_Activity_PeriodTask;
	25082024: ISheetData_Activity_PeriodTask;
	25082025: ISheetData_Activity_PeriodTask;
	25082026: ISheetData_Activity_PeriodTask;
	25082027: ISheetData_Activity_PeriodTask;
	25082028: ISheetData_Activity_PeriodTask;
	25082029: ISheetData_Activity_PeriodTask;
	25082030: ISheetData_Activity_PeriodTask;
	25082031: ISheetData_Activity_PeriodTask;
	25082032: ISheetData_Activity_PeriodTask;
	25082033: ISheetData_Activity_PeriodTask;
	25082034: ISheetData_Activity_PeriodTask;
	25082035: ISheetData_Activity_PeriodTask;
	25082036: ISheetData_Activity_PeriodTask;
	25082037: ISheetData_Activity_PeriodTask;
	25082038: ISheetData_Activity_PeriodTask;
	25082039: ISheetData_Activity_PeriodTask;
	25082040: ISheetData_Activity_PeriodTask;
	25082041: ISheetData_Activity_PeriodTask;
	25082042: ISheetData_Activity_PeriodTask;
	25082043: ISheetData_Activity_PeriodTask;
	25082044: ISheetData_Activity_PeriodTask;
	25082045: ISheetData_Activity_PeriodTask;
	25082101: ISheetData_Activity_PeriodTask;
	25082102: ISheetData_Activity_PeriodTask;
	25082103: ISheetData_Activity_PeriodTask;
	25082104: ISheetData_Activity_PeriodTask;
	25082105: ISheetData_Activity_PeriodTask;
	25082106: ISheetData_Activity_PeriodTask;
	25082107: ISheetData_Activity_PeriodTask;
	25082108: ISheetData_Activity_PeriodTask;
	25082109: ISheetData_Activity_PeriodTask;
	25082110: ISheetData_Activity_PeriodTask;
	25082111: ISheetData_Activity_PeriodTask;
	25082112: ISheetData_Activity_PeriodTask;
	25082113: ISheetData_Activity_PeriodTask;
	25082114: ISheetData_Activity_PeriodTask;
	25082115: ISheetData_Activity_PeriodTask;
	25082116: ISheetData_Activity_PeriodTask;
	25082117: ISheetData_Activity_PeriodTask;
	25082118: ISheetData_Activity_PeriodTask;
	25082119: ISheetData_Activity_PeriodTask;
	25082120: ISheetData_Activity_PeriodTask;
	25082121: ISheetData_Activity_PeriodTask;
	25082122: ISheetData_Activity_PeriodTask;
	25082123: ISheetData_Activity_PeriodTask;
	25082124: ISheetData_Activity_PeriodTask;
	25082125: ISheetData_Activity_PeriodTask;
	25082126: ISheetData_Activity_PeriodTask;
	25082127: ISheetData_Activity_PeriodTask;
	25082128: ISheetData_Activity_PeriodTask;
	25082129: ISheetData_Activity_PeriodTask;
	25082130: ISheetData_Activity_PeriodTask;
	25082131: ISheetData_Activity_PeriodTask;
	25082132: ISheetData_Activity_PeriodTask;
	25082133: ISheetData_Activity_PeriodTask;
	25082134: ISheetData_Activity_PeriodTask;
	25082135: ISheetData_Activity_PeriodTask;
	25082136: ISheetData_Activity_PeriodTask;
	25082137: ISheetData_Activity_PeriodTask;
	25082138: ISheetData_Activity_PeriodTask;
	25082139: ISheetData_Activity_PeriodTask;
	25082140: ISheetData_Activity_PeriodTask;
	25082141: ISheetData_Activity_PeriodTask;
	25082142: ISheetData_Activity_PeriodTask;
	25082143: ISheetData_Activity_PeriodTask;
	25082144: ISheetData_Activity_PeriodTask;
	25082145: ISheetData_Activity_PeriodTask;
	25089201: ISheetData_Activity_PeriodTask;
	25089202: ISheetData_Activity_PeriodTask;
	25089203: ISheetData_Activity_PeriodTask;
	25089301: ISheetData_Activity_PeriodTask;
	25089401: ISheetData_Activity_PeriodTask;
	25089402: ISheetData_Activity_PeriodTask;
	25089403: ISheetData_Activity_PeriodTask;
	25089404: ISheetData_Activity_PeriodTask;
	25089405: ISheetData_Activity_PeriodTask;
	25090201: ISheetData_Activity_PeriodTask;
	25090202: ISheetData_Activity_PeriodTask;
	25090203: ISheetData_Activity_PeriodTask;
	25090204: ISheetData_Activity_PeriodTask;
	25090205: ISheetData_Activity_PeriodTask;
	25090206: ISheetData_Activity_PeriodTask;
	25090207: ISheetData_Activity_PeriodTask;
	25090208: ISheetData_Activity_PeriodTask;
	25090209: ISheetData_Activity_PeriodTask;
	25090210: ISheetData_Activity_PeriodTask;
	25090211: ISheetData_Activity_PeriodTask;
	25090212: ISheetData_Activity_PeriodTask;
	25090213: ISheetData_Activity_PeriodTask;
	25090214: ISheetData_Activity_PeriodTask;
	25090215: ISheetData_Activity_PeriodTask;
	25090216: ISheetData_Activity_PeriodTask;
	25090217: ISheetData_Activity_PeriodTask;
	25090218: ISheetData_Activity_PeriodTask;
	25090219: ISheetData_Activity_PeriodTask;
	25090220: ISheetData_Activity_PeriodTask;
	25090221: ISheetData_Activity_PeriodTask;
	25090222: ISheetData_Activity_PeriodTask;
	25090223: ISheetData_Activity_PeriodTask;
	25090224: ISheetData_Activity_PeriodTask;
	25090225: ISheetData_Activity_PeriodTask;
	25090226: ISheetData_Activity_PeriodTask;
	25090227: ISheetData_Activity_PeriodTask;
	25090228: ISheetData_Activity_PeriodTask;
	25090229: ISheetData_Activity_PeriodTask;
	25090230: ISheetData_Activity_PeriodTask;
	25090231: ISheetData_Activity_PeriodTask;
}
declare interface ISheetData_Activity_PeriodTask {
	/** 活动任务id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励 */
	reward: string;
	/** 刷新周期 */
	interval: number;
	/** 周期内能完成的次数限制 */
	progress_limit: number;
	/** 次数限制周期 */
	progress_limit_interval: number;
	/** 活动开始x天后才可以领取 */
	reward_limit_day: number;
	/** 任务有效时间，在有效时间内才可以累计任务进度，领取任务奖励，格式：{startDay}-{endDay} 例: 0-5 代表活动开始第0天至活动开始后第5天[0, 5] */
	accessible_days: string;
	/** 第一次拉到活动后x天解锁 */
	unlock_day: number;
	/** 维护用字段，将任务转变为不可见不可领状态 */
	deprecated: number;
	/** 0普通1突出 */
	node_mark: number;
	/** 补发邮件是否忽略 */
	omit_mail_reward: number;
}
//#endregion

//#region random_task_pool --- group
declare interface ISheet_Activity_RandomTaskPool {
	rows: ISheetData_Activity_RandomTaskPool[];
	106501: ISheetData_Activity_RandomTaskPool[];
	106502: ISheetData_Activity_RandomTaskPool[];
	106503: ISheetData_Activity_RandomTaskPool[];
	107401: ISheetData_Activity_RandomTaskPool[];
	107402: ISheetData_Activity_RandomTaskPool[];
	107403: ISheetData_Activity_RandomTaskPool[];
	109501: ISheetData_Activity_RandomTaskPool[];
	109502: ISheetData_Activity_RandomTaskPool[];
	109503: ISheetData_Activity_RandomTaskPool[];
	119301: ISheetData_Activity_RandomTaskPool[];
	119302: ISheetData_Activity_RandomTaskPool[];
	119303: ISheetData_Activity_RandomTaskPool[];
	124701: ISheetData_Activity_RandomTaskPool[];
	124702: ISheetData_Activity_RandomTaskPool[];
	124703: ISheetData_Activity_RandomTaskPool[];
	130001: ISheetData_Activity_RandomTaskPool[];
	130002: ISheetData_Activity_RandomTaskPool[];
	130003: ISheetData_Activity_RandomTaskPool[];
	2210011: ISheetData_Activity_RandomTaskPool[];
	2210012: ISheetData_Activity_RandomTaskPool[];
	2210013: ISheetData_Activity_RandomTaskPool[];
	2303021: ISheetData_Activity_RandomTaskPool[];
	2303022: ISheetData_Activity_RandomTaskPool[];
	2303023: ISheetData_Activity_RandomTaskPool[];
	2305011: ISheetData_Activity_RandomTaskPool[];
	2305012: ISheetData_Activity_RandomTaskPool[];
	2305013: ISheetData_Activity_RandomTaskPool[];
	2310021: ISheetData_Activity_RandomTaskPool[];
	2310022: ISheetData_Activity_RandomTaskPool[];
	2310023: ISheetData_Activity_RandomTaskPool[];
	2402011: ISheetData_Activity_RandomTaskPool[];
	2402012: ISheetData_Activity_RandomTaskPool[];
	2402013: ISheetData_Activity_RandomTaskPool[];
	2409021: ISheetData_Activity_RandomTaskPool[];
	2409022: ISheetData_Activity_RandomTaskPool[];
	2409023: ISheetData_Activity_RandomTaskPool[];
	2410011: ISheetData_Activity_RandomTaskPool[];
	2410012: ISheetData_Activity_RandomTaskPool[];
	2410013: ISheetData_Activity_RandomTaskPool[];
	2412021: ISheetData_Activity_RandomTaskPool[];
	2412022: ISheetData_Activity_RandomTaskPool[];
	2412023: ISheetData_Activity_RandomTaskPool[];
	2505021: ISheetData_Activity_RandomTaskPool[];
	2505022: ISheetData_Activity_RandomTaskPool[];
	2505023: ISheetData_Activity_RandomTaskPool[];
	2507011: ISheetData_Activity_RandomTaskPool[];
	2507012: ISheetData_Activity_RandomTaskPool[];
	2507013: ISheetData_Activity_RandomTaskPool[];
}
declare interface ISheetData_Activity_RandomTaskPool {
	/** 任务池ID */
	pool_id: number;
	/** 任务id */
	task_id: number;
	/** 活动ID */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
	/** 权重 */
	weight: number;
	/** 隐藏奖励 */
	hidden_reward: string;
	/** 限制ID source_limit表 */
	limit_id: number;
}
//#endregion

//#region random_task_info --- unique
declare interface ISheet_Activity_RandomTaskInfo {
	rows: ISheetData_Activity_RandomTaskInfo[];
	1065: ISheetData_Activity_RandomTaskInfo;
	1074: ISheetData_Activity_RandomTaskInfo;
	1095: ISheetData_Activity_RandomTaskInfo;
	1193: ISheetData_Activity_RandomTaskInfo;
	1247: ISheetData_Activity_RandomTaskInfo;
	1300: ISheetData_Activity_RandomTaskInfo;
	221001: ISheetData_Activity_RandomTaskInfo;
	230302: ISheetData_Activity_RandomTaskInfo;
	230501: ISheetData_Activity_RandomTaskInfo;
	231002: ISheetData_Activity_RandomTaskInfo;
	240201: ISheetData_Activity_RandomTaskInfo;
	240902: ISheetData_Activity_RandomTaskInfo;
	241001: ISheetData_Activity_RandomTaskInfo;
	241202: ISheetData_Activity_RandomTaskInfo;
	250502: ISheetData_Activity_RandomTaskInfo;
	250701: ISheetData_Activity_RandomTaskInfo;
}
declare interface ISheetData_Activity_RandomTaskInfo {
	/** 活动ID */
	activity_id: number;
	/** 任务池ID */
	pool_id: number[];
}
//#endregion

//#region richman_reward_seq --- group
declare interface ISheet_Activity_RichmanRewardSeq {
	rows: ISheetData_Activity_RichmanRewardSeq[];
	10101: ISheetData_Activity_RichmanRewardSeq[];
}
declare interface ISheetData_Activity_RichmanRewardSeq {
	/** id */
	id: number;
	/** 完成圈数 */
	count: number;
	/** 奖励 */
	reward: string;
}
//#endregion

//#region activity_buff --- group
declare interface ISheet_Activity_ActivityBuff {
	rows: ISheetData_Activity_ActivityBuff[];
	10001: ISheetData_Activity_ActivityBuff[];
	10002: ISheetData_Activity_ActivityBuff[];
	10003: ISheetData_Activity_ActivityBuff[];
	117501: ISheetData_Activity_ActivityBuff[];
	117502: ISheetData_Activity_ActivityBuff[];
	117503: ISheetData_Activity_ActivityBuff[];
	117504: ISheetData_Activity_ActivityBuff[];
	121401: ISheetData_Activity_ActivityBuff[];
	121402: ISheetData_Activity_ActivityBuff[];
	121403: ISheetData_Activity_ActivityBuff[];
	121404: ISheetData_Activity_ActivityBuff[];
	22081201: ISheetData_Activity_ActivityBuff[];
	22081202: ISheetData_Activity_ActivityBuff[];
	22081203: ISheetData_Activity_ActivityBuff[];
	22081204: ISheetData_Activity_ActivityBuff[];
	22081205: ISheetData_Activity_ActivityBuff[];
	24040101: ISheetData_Activity_ActivityBuff[];
	24040102: ISheetData_Activity_ActivityBuff[];
	24040103: ISheetData_Activity_ActivityBuff[];
	24040104: ISheetData_Activity_ActivityBuff[];
	24110301: ISheetData_Activity_ActivityBuff[];
	24110302: ISheetData_Activity_ActivityBuff[];
	24110303: ISheetData_Activity_ActivityBuff[];
	25010201: ISheetData_Activity_ActivityBuff[];
	25010202: ISheetData_Activity_ActivityBuff[];
	25010203: ISheetData_Activity_ActivityBuff[];
}
declare interface ISheetData_Activity_ActivityBuff {
	/** buffid */
	buff_id: number;
	/** 活动ID */
	activity_id: number;
	/** buff等级 */
	buff_level: number;
	/** buff类型 */
	buff_type: number;
	/** 升级资源ID */
	upgrade_resource_id: number;
	/** 升级资源数量 */
	upgrade_resource_count: number;
	/** buff效果 */
	effect: number;
	/** 解锁条件参数0 */
	unlock_params: number[];
	/** 当前buff效果描述strid */
	effect_desc: number;
	/** 当前buff效果描述strid2 */
	effect_desc_2: number;
	/** 次数限制 */
	limit_count: number;
	/** 次数限制周期 */
	limit_interval: number;
}
//#endregion

//#region buff_condition --- group
declare interface ISheet_Activity_BuffCondition {
	rows: ISheetData_Activity_BuffCondition[];
	10001: ISheetData_Activity_BuffCondition[];
	10002: ISheetData_Activity_BuffCondition[];
	10003: ISheetData_Activity_BuffCondition[];
	117501: ISheetData_Activity_BuffCondition[];
	117502: ISheetData_Activity_BuffCondition[];
	117503: ISheetData_Activity_BuffCondition[];
	117504: ISheetData_Activity_BuffCondition[];
	121401: ISheetData_Activity_BuffCondition[];
	121402: ISheetData_Activity_BuffCondition[];
	121403: ISheetData_Activity_BuffCondition[];
	121404: ISheetData_Activity_BuffCondition[];
	22081201: ISheetData_Activity_BuffCondition[];
	22081202: ISheetData_Activity_BuffCondition[];
	22081203: ISheetData_Activity_BuffCondition[];
	22081204: ISheetData_Activity_BuffCondition[];
	22081205: ISheetData_Activity_BuffCondition[];
	24040101: ISheetData_Activity_BuffCondition[];
	24040102: ISheetData_Activity_BuffCondition[];
	24040103: ISheetData_Activity_BuffCondition[];
	24040104: ISheetData_Activity_BuffCondition[];
	24110301: ISheetData_Activity_BuffCondition[];
	24110302: ISheetData_Activity_BuffCondition[];
	24110303: ISheetData_Activity_BuffCondition[];
	25010201: ISheetData_Activity_BuffCondition[];
	25010202: ISheetData_Activity_BuffCondition[];
	25010203: ISheetData_Activity_BuffCondition[];
}
declare interface ISheetData_Activity_BuffCondition {
	/** buffid */
	buff_id: number;
	/** 条件 */
	args: number[];
}
//#endregion

//#region game_point_info --- unique
declare interface ISheet_Activity_GamePointInfo {
	rows: ISheetData_Activity_GamePointInfo[];
	1135: ISheetData_Activity_GamePointInfo;
	221201: ISheetData_Activity_GamePointInfo;
	231151: ISheetData_Activity_GamePointInfo;
}
declare interface ISheetData_Activity_GamePointInfo {
	/** 活动ID */
	activity_id: number;
	/** 得分筛选器id */
	filter_id: number;
	/** 邮件补发奖品编号 */
	reward_mail_template: number;
	/** 活动点数解除限制的day，全程不解限填-1 */
	max_point_limit_day: number;
	/** 如果为0则game_point_rank不生效 */
	should_rank: number;
}
//#endregion

//#region game_point_rank --- group
declare interface ISheet_Activity_GamePointRank {
	rows: ISheetData_Activity_GamePointRank[];
	1135: ISheetData_Activity_GamePointRank[];
}
declare interface ISheetData_Activity_GamePointRank {
	/** 活动ID */
	activity_id: number;
	/** 大于（百分比） */
	rank_rate_lower: number;
	/** 小于等于（百分比） */
	rank_rate_upper: number;
	/** 奖励 */
	reward: string;
}
//#endregion

//#region game_point_filter --- group
declare interface ISheet_Activity_GamePointFilter {
	rows: ISheetData_Activity_GamePointFilter[];
	1001: ISheetData_Activity_GamePointFilter[];
	221201: ISheetData_Activity_GamePointFilter[];
	231151: ISheetData_Activity_GamePointFilter[];
}
declare interface ISheetData_Activity_GamePointFilter {
	id: number;
	/** 是否可以带AI */
	has_robot: string;
	/** 对局类别 */
	category: string;
	/** 匹配房间 */
	room: string;
	/** 对局模式 */
	mode: string;
	/** 点数比例（x分之一） */
	point_coe: number;
}
//#endregion

//#region activity_room --- unique
declare interface ISheet_Activity_ActivityRoom {
	rows: ISheetData_Activity_ActivityRoom[];
	1161: ISheetData_Activity_ActivityRoom;
	1166: ISheetData_Activity_ActivityRoom;
	1190: ISheetData_Activity_ActivityRoom;
	1232: ISheetData_Activity_ActivityRoom;
	1233: ISheetData_Activity_ActivityRoom;
	1296: ISheetData_Activity_ActivityRoom;
	1297: ISheetData_Activity_ActivityRoom;
	220410: ISheetData_Activity_ActivityRoom;
	221107: ISheetData_Activity_ActivityRoom;
	230408: ISheetData_Activity_ActivityRoom;
	231123: ISheetData_Activity_ActivityRoom;
	240412: ISheetData_Activity_ActivityRoom;
	241141: ISheetData_Activity_ActivityRoom;
	250412: ISheetData_Activity_ActivityRoom;
}
declare interface ISheetData_Activity_ActivityRoom {
	/** 友人房活动ID */
	activity_id: number;
	/** 数字小的在前 */
	sort: number;
	/** 对局名 */
	str_name: string;
	/** 拼接规则 */
	str_rule: string;
	/** 对应desktop/friend_room */
	friend_room_id: number;
	/** 是否允许开dora3 */
	dora3_mode: number;
	/** 是否允许开配牌open */
	begin_open_mode: number;
	/** 是否允许开目玉 */
	muyu_mode: number;
	/** 是否允许开血战 */
	xuezhan_mode: number;
	/** 是否允许开换三张 */
	huanzhang_mode: number;
	/** 川麻模式 */
	chuanma_mode: number;
	/** 三透牌模式 */
	jiuchao_mode: number;
	/** 暗牌模式 */
	reveal_discard: number;
	field_spell_mode: number;
	zhanxing_mode: number;
	tianming_mode: number;
	yongchang_mode: number;
	hunzhiyiji_mode: number;
	wanxiangxiuluo_mode: number;
	beishuizhizhan_mode: number;
}
//#endregion

//#region sns_activity --- unique
declare interface ISheet_Activity_SnsActivity {
	rows: ISheetData_Activity_SnsActivity[];
	1: ISheetData_Activity_SnsActivity;
	101: ISheetData_Activity_SnsActivity;
	102: ISheetData_Activity_SnsActivity;
	103: ISheetData_Activity_SnsActivity;
	104: ISheetData_Activity_SnsActivity;
	105: ISheetData_Activity_SnsActivity;
	106: ISheetData_Activity_SnsActivity;
	107: ISheetData_Activity_SnsActivity;
	108: ISheetData_Activity_SnsActivity;
	109: ISheetData_Activity_SnsActivity;
	110: ISheetData_Activity_SnsActivity;
	111: ISheetData_Activity_SnsActivity;
	201: ISheetData_Activity_SnsActivity;
	202: ISheetData_Activity_SnsActivity;
	203: ISheetData_Activity_SnsActivity;
	204: ISheetData_Activity_SnsActivity;
	205: ISheetData_Activity_SnsActivity;
	206: ISheetData_Activity_SnsActivity;
	207: ISheetData_Activity_SnsActivity;
	208: ISheetData_Activity_SnsActivity;
	301: ISheetData_Activity_SnsActivity;
	302: ISheetData_Activity_SnsActivity;
	303: ISheetData_Activity_SnsActivity;
	304: ISheetData_Activity_SnsActivity;
	305: ISheetData_Activity_SnsActivity;
	306: ISheetData_Activity_SnsActivity;
	307: ISheetData_Activity_SnsActivity;
	308: ISheetData_Activity_SnsActivity;
	309: ISheetData_Activity_SnsActivity;
	310: ISheetData_Activity_SnsActivity;
	311: ISheetData_Activity_SnsActivity;
	312: ISheetData_Activity_SnsActivity;
	401: ISheetData_Activity_SnsActivity;
	402: ISheetData_Activity_SnsActivity;
	403: ISheetData_Activity_SnsActivity;
	404: ISheetData_Activity_SnsActivity;
	405: ISheetData_Activity_SnsActivity;
	406: ISheetData_Activity_SnsActivity;
	407: ISheetData_Activity_SnsActivity;
	408: ISheetData_Activity_SnsActivity;
	501: ISheetData_Activity_SnsActivity;
	502: ISheetData_Activity_SnsActivity;
	503: ISheetData_Activity_SnsActivity;
	504: ISheetData_Activity_SnsActivity;
	505: ISheetData_Activity_SnsActivity;
	506: ISheetData_Activity_SnsActivity;
	507: ISheetData_Activity_SnsActivity;
	508: ISheetData_Activity_SnsActivity;
	509: ISheetData_Activity_SnsActivity;
	601: ISheetData_Activity_SnsActivity;
	602: ISheetData_Activity_SnsActivity;
	603: ISheetData_Activity_SnsActivity;
	604: ISheetData_Activity_SnsActivity;
	605: ISheetData_Activity_SnsActivity;
	606: ISheetData_Activity_SnsActivity;
	607: ISheetData_Activity_SnsActivity;
	608: ISheetData_Activity_SnsActivity;
	609: ISheetData_Activity_SnsActivity;
	701: ISheetData_Activity_SnsActivity;
	702: ISheetData_Activity_SnsActivity;
	704: ISheetData_Activity_SnsActivity;
	705: ISheetData_Activity_SnsActivity;
	706: ISheetData_Activity_SnsActivity;
	707: ISheetData_Activity_SnsActivity;
	708: ISheetData_Activity_SnsActivity;
	709: ISheetData_Activity_SnsActivity;
	801: ISheetData_Activity_SnsActivity;
	802: ISheetData_Activity_SnsActivity;
	803: ISheetData_Activity_SnsActivity;
	804: ISheetData_Activity_SnsActivity;
	805: ISheetData_Activity_SnsActivity;
	806: ISheetData_Activity_SnsActivity;
	807: ISheetData_Activity_SnsActivity;
	808: ISheetData_Activity_SnsActivity;
	901: ISheetData_Activity_SnsActivity;
	902: ISheetData_Activity_SnsActivity;
	903: ISheetData_Activity_SnsActivity;
	904: ISheetData_Activity_SnsActivity;
	905: ISheetData_Activity_SnsActivity;
	906: ISheetData_Activity_SnsActivity;
	907: ISheetData_Activity_SnsActivity;
	908: ISheetData_Activity_SnsActivity;
	909: ISheetData_Activity_SnsActivity;
	910: ISheetData_Activity_SnsActivity;
	1001: ISheetData_Activity_SnsActivity;
	1002: ISheetData_Activity_SnsActivity;
	1003: ISheetData_Activity_SnsActivity;
	1004: ISheetData_Activity_SnsActivity;
	1005: ISheetData_Activity_SnsActivity;
	1006: ISheetData_Activity_SnsActivity;
	1007: ISheetData_Activity_SnsActivity;
	1008: ISheetData_Activity_SnsActivity;
	1009: ISheetData_Activity_SnsActivity;
	1101: ISheetData_Activity_SnsActivity;
	1102: ISheetData_Activity_SnsActivity;
	1103: ISheetData_Activity_SnsActivity;
	1104: ISheetData_Activity_SnsActivity;
	1105: ISheetData_Activity_SnsActivity;
	1106: ISheetData_Activity_SnsActivity;
	1107: ISheetData_Activity_SnsActivity;
	1108: ISheetData_Activity_SnsActivity;
	1201: ISheetData_Activity_SnsActivity;
	1202: ISheetData_Activity_SnsActivity;
	1203: ISheetData_Activity_SnsActivity;
	1204: ISheetData_Activity_SnsActivity;
	1205: ISheetData_Activity_SnsActivity;
	1206: ISheetData_Activity_SnsActivity;
	1207: ISheetData_Activity_SnsActivity;
	1208: ISheetData_Activity_SnsActivity;
	1209: ISheetData_Activity_SnsActivity;
	1210: ISheetData_Activity_SnsActivity;
	1301: ISheetData_Activity_SnsActivity;
	1302: ISheetData_Activity_SnsActivity;
	1303: ISheetData_Activity_SnsActivity;
	1304: ISheetData_Activity_SnsActivity;
	1305: ISheetData_Activity_SnsActivity;
	1306: ISheetData_Activity_SnsActivity;
	1307: ISheetData_Activity_SnsActivity;
	1401: ISheetData_Activity_SnsActivity;
	1402: ISheetData_Activity_SnsActivity;
	1403: ISheetData_Activity_SnsActivity;
	1404: ISheetData_Activity_SnsActivity;
	1405: ISheetData_Activity_SnsActivity;
	1406: ISheetData_Activity_SnsActivity;
	1407: ISheetData_Activity_SnsActivity;
	1408: ISheetData_Activity_SnsActivity;
	1409: ISheetData_Activity_SnsActivity;
	1410: ISheetData_Activity_SnsActivity;
	1411: ISheetData_Activity_SnsActivity;
	1501: ISheetData_Activity_SnsActivity;
	1502: ISheetData_Activity_SnsActivity;
	1503: ISheetData_Activity_SnsActivity;
	1504: ISheetData_Activity_SnsActivity;
	1505: ISheetData_Activity_SnsActivity;
	1506: ISheetData_Activity_SnsActivity;
	1507: ISheetData_Activity_SnsActivity;
	1508: ISheetData_Activity_SnsActivity;
	1509: ISheetData_Activity_SnsActivity;
	1510: ISheetData_Activity_SnsActivity;
	1511: ISheetData_Activity_SnsActivity;
	1601: ISheetData_Activity_SnsActivity;
	1602: ISheetData_Activity_SnsActivity;
	1603: ISheetData_Activity_SnsActivity;
	1604: ISheetData_Activity_SnsActivity;
	1605: ISheetData_Activity_SnsActivity;
	1606: ISheetData_Activity_SnsActivity;
	1607: ISheetData_Activity_SnsActivity;
	1608: ISheetData_Activity_SnsActivity;
	1609: ISheetData_Activity_SnsActivity;
	1701: ISheetData_Activity_SnsActivity;
	1702: ISheetData_Activity_SnsActivity;
	1703: ISheetData_Activity_SnsActivity;
	1704: ISheetData_Activity_SnsActivity;
	1705: ISheetData_Activity_SnsActivity;
	1706: ISheetData_Activity_SnsActivity;
	1707: ISheetData_Activity_SnsActivity;
	1708: ISheetData_Activity_SnsActivity;
	1709: ISheetData_Activity_SnsActivity;
	1801: ISheetData_Activity_SnsActivity;
	1802: ISheetData_Activity_SnsActivity;
	1803: ISheetData_Activity_SnsActivity;
	1804: ISheetData_Activity_SnsActivity;
	1805: ISheetData_Activity_SnsActivity;
	1806: ISheetData_Activity_SnsActivity;
	1807: ISheetData_Activity_SnsActivity;
	1808: ISheetData_Activity_SnsActivity;
	1901: ISheetData_Activity_SnsActivity;
	1902: ISheetData_Activity_SnsActivity;
	1903: ISheetData_Activity_SnsActivity;
	1904: ISheetData_Activity_SnsActivity;
	1905: ISheetData_Activity_SnsActivity;
	1906: ISheetData_Activity_SnsActivity;
	1907: ISheetData_Activity_SnsActivity;
	1908: ISheetData_Activity_SnsActivity;
	1909: ISheetData_Activity_SnsActivity;
	1910: ISheetData_Activity_SnsActivity;
	1911: ISheetData_Activity_SnsActivity;
	1912: ISheetData_Activity_SnsActivity;
	2001: ISheetData_Activity_SnsActivity;
	2002: ISheetData_Activity_SnsActivity;
	2003: ISheetData_Activity_SnsActivity;
	2004: ISheetData_Activity_SnsActivity;
	2005: ISheetData_Activity_SnsActivity;
	12050101: ISheetData_Activity_SnsActivity;
	12050102: ISheetData_Activity_SnsActivity;
	12050103: ISheetData_Activity_SnsActivity;
	12050104: ISheetData_Activity_SnsActivity;
	12050105: ISheetData_Activity_SnsActivity;
	12050106: ISheetData_Activity_SnsActivity;
	12050107: ISheetData_Activity_SnsActivity;
	12050108: ISheetData_Activity_SnsActivity;
	12050109: ISheetData_Activity_SnsActivity;
	12050201: ISheetData_Activity_SnsActivity;
	12050202: ISheetData_Activity_SnsActivity;
	12050203: ISheetData_Activity_SnsActivity;
	12050204: ISheetData_Activity_SnsActivity;
	12050205: ISheetData_Activity_SnsActivity;
	12050206: ISheetData_Activity_SnsActivity;
	12050207: ISheetData_Activity_SnsActivity;
	12050208: ISheetData_Activity_SnsActivity;
	12050209: ISheetData_Activity_SnsActivity;
	12050210: ISheetData_Activity_SnsActivity;
	12050211: ISheetData_Activity_SnsActivity;
	12050212: ISheetData_Activity_SnsActivity;
	12050213: ISheetData_Activity_SnsActivity;
	12050214: ISheetData_Activity_SnsActivity;
	12050215: ISheetData_Activity_SnsActivity;
	12050216: ISheetData_Activity_SnsActivity;
	12050217: ISheetData_Activity_SnsActivity;
	12050218: ISheetData_Activity_SnsActivity;
	12050301: ISheetData_Activity_SnsActivity;
	12050302: ISheetData_Activity_SnsActivity;
	12050303: ISheetData_Activity_SnsActivity;
	12050304: ISheetData_Activity_SnsActivity;
	12050305: ISheetData_Activity_SnsActivity;
	12050306: ISheetData_Activity_SnsActivity;
	12050307: ISheetData_Activity_SnsActivity;
	12050308: ISheetData_Activity_SnsActivity;
	12050309: ISheetData_Activity_SnsActivity;
	12050401: ISheetData_Activity_SnsActivity;
	12050402: ISheetData_Activity_SnsActivity;
	12050403: ISheetData_Activity_SnsActivity;
	12050404: ISheetData_Activity_SnsActivity;
	12050405: ISheetData_Activity_SnsActivity;
	12050406: ISheetData_Activity_SnsActivity;
	12050407: ISheetData_Activity_SnsActivity;
	12050408: ISheetData_Activity_SnsActivity;
	12050409: ISheetData_Activity_SnsActivity;
	12050501: ISheetData_Activity_SnsActivity;
	12050502: ISheetData_Activity_SnsActivity;
	12050503: ISheetData_Activity_SnsActivity;
	12050504: ISheetData_Activity_SnsActivity;
	12050505: ISheetData_Activity_SnsActivity;
	12050506: ISheetData_Activity_SnsActivity;
	12050507: ISheetData_Activity_SnsActivity;
	12050601: ISheetData_Activity_SnsActivity;
	12050602: ISheetData_Activity_SnsActivity;
	12050603: ISheetData_Activity_SnsActivity;
	12050604: ISheetData_Activity_SnsActivity;
	12050605: ISheetData_Activity_SnsActivity;
	12050606: ISheetData_Activity_SnsActivity;
	12050607: ISheetData_Activity_SnsActivity;
	12050608: ISheetData_Activity_SnsActivity;
	12050609: ISheetData_Activity_SnsActivity;
	12050701: ISheetData_Activity_SnsActivity;
	12050702: ISheetData_Activity_SnsActivity;
	12050703: ISheetData_Activity_SnsActivity;
	12050704: ISheetData_Activity_SnsActivity;
	12050705: ISheetData_Activity_SnsActivity;
	12050706: ISheetData_Activity_SnsActivity;
	12050707: ISheetData_Activity_SnsActivity;
	12050801: ISheetData_Activity_SnsActivity;
	12050802: ISheetData_Activity_SnsActivity;
	12050803: ISheetData_Activity_SnsActivity;
	12050804: ISheetData_Activity_SnsActivity;
	12050805: ISheetData_Activity_SnsActivity;
	12050806: ISheetData_Activity_SnsActivity;
	12050807: ISheetData_Activity_SnsActivity;
	12050808: ISheetData_Activity_SnsActivity;
	12050809: ISheetData_Activity_SnsActivity;
	12050901: ISheetData_Activity_SnsActivity;
	12050902: ISheetData_Activity_SnsActivity;
	12050903: ISheetData_Activity_SnsActivity;
	12050904: ISheetData_Activity_SnsActivity;
	12050905: ISheetData_Activity_SnsActivity;
	12050906: ISheetData_Activity_SnsActivity;
	12050907: ISheetData_Activity_SnsActivity;
	12051001: ISheetData_Activity_SnsActivity;
	12051002: ISheetData_Activity_SnsActivity;
	12051003: ISheetData_Activity_SnsActivity;
	12051004: ISheetData_Activity_SnsActivity;
	12051005: ISheetData_Activity_SnsActivity;
	12051006: ISheetData_Activity_SnsActivity;
	12051007: ISheetData_Activity_SnsActivity;
	12051008: ISheetData_Activity_SnsActivity;
	12051009: ISheetData_Activity_SnsActivity;
	12051101: ISheetData_Activity_SnsActivity;
	12051102: ISheetData_Activity_SnsActivity;
	12051103: ISheetData_Activity_SnsActivity;
	12051104: ISheetData_Activity_SnsActivity;
	12051105: ISheetData_Activity_SnsActivity;
	12051106: ISheetData_Activity_SnsActivity;
	12051107: ISheetData_Activity_SnsActivity;
	12051108: ISheetData_Activity_SnsActivity;
	12051201: ISheetData_Activity_SnsActivity;
	12051202: ISheetData_Activity_SnsActivity;
	12051203: ISheetData_Activity_SnsActivity;
	12051204: ISheetData_Activity_SnsActivity;
	12051205: ISheetData_Activity_SnsActivity;
	12051206: ISheetData_Activity_SnsActivity;
	12051207: ISheetData_Activity_SnsActivity;
	12051208: ISheetData_Activity_SnsActivity;
	12051209: ISheetData_Activity_SnsActivity;
	12051210: ISheetData_Activity_SnsActivity;
	12051211: ISheetData_Activity_SnsActivity;
	12051301: ISheetData_Activity_SnsActivity;
	12051302: ISheetData_Activity_SnsActivity;
	12051303: ISheetData_Activity_SnsActivity;
	12051304: ISheetData_Activity_SnsActivity;
	12051305: ISheetData_Activity_SnsActivity;
	12051306: ISheetData_Activity_SnsActivity;
	12051307: ISheetData_Activity_SnsActivity;
	12051401: ISheetData_Activity_SnsActivity;
	12051402: ISheetData_Activity_SnsActivity;
	12051403: ISheetData_Activity_SnsActivity;
	12051404: ISheetData_Activity_SnsActivity;
	12051405: ISheetData_Activity_SnsActivity;
	12051406: ISheetData_Activity_SnsActivity;
	12051407: ISheetData_Activity_SnsActivity;
	12220101: ISheetData_Activity_SnsActivity;
	12220102: ISheetData_Activity_SnsActivity;
	12220103: ISheetData_Activity_SnsActivity;
	12220104: ISheetData_Activity_SnsActivity;
	12220105: ISheetData_Activity_SnsActivity;
	12220106: ISheetData_Activity_SnsActivity;
	12220107: ISheetData_Activity_SnsActivity;
	12220108: ISheetData_Activity_SnsActivity;
	12220109: ISheetData_Activity_SnsActivity;
	12220110: ISheetData_Activity_SnsActivity;
	12220111: ISheetData_Activity_SnsActivity;
	12220112: ISheetData_Activity_SnsActivity;
	12220201: ISheetData_Activity_SnsActivity;
	12220202: ISheetData_Activity_SnsActivity;
	12220203: ISheetData_Activity_SnsActivity;
	12220204: ISheetData_Activity_SnsActivity;
	12220205: ISheetData_Activity_SnsActivity;
	12220206: ISheetData_Activity_SnsActivity;
	12220207: ISheetData_Activity_SnsActivity;
	12220208: ISheetData_Activity_SnsActivity;
	12220209: ISheetData_Activity_SnsActivity;
	12220210: ISheetData_Activity_SnsActivity;
	12220301: ISheetData_Activity_SnsActivity;
	12220302: ISheetData_Activity_SnsActivity;
	12220303: ISheetData_Activity_SnsActivity;
	12220304: ISheetData_Activity_SnsActivity;
	12220305: ISheetData_Activity_SnsActivity;
	12220306: ISheetData_Activity_SnsActivity;
	12220307: ISheetData_Activity_SnsActivity;
	12220308: ISheetData_Activity_SnsActivity;
	12220309: ISheetData_Activity_SnsActivity;
	12220310: ISheetData_Activity_SnsActivity;
	12220311: ISheetData_Activity_SnsActivity;
	12220401: ISheetData_Activity_SnsActivity;
	12220402: ISheetData_Activity_SnsActivity;
	12220403: ISheetData_Activity_SnsActivity;
	12220404: ISheetData_Activity_SnsActivity;
	12220405: ISheetData_Activity_SnsActivity;
	12220406: ISheetData_Activity_SnsActivity;
	12220407: ISheetData_Activity_SnsActivity;
	12220408: ISheetData_Activity_SnsActivity;
	12220409: ISheetData_Activity_SnsActivity;
	12220501: ISheetData_Activity_SnsActivity;
	12220502: ISheetData_Activity_SnsActivity;
	12220503: ISheetData_Activity_SnsActivity;
	12220504: ISheetData_Activity_SnsActivity;
	12220505: ISheetData_Activity_SnsActivity;
	12220506: ISheetData_Activity_SnsActivity;
	12220507: ISheetData_Activity_SnsActivity;
	12220601: ISheetData_Activity_SnsActivity;
	12220602: ISheetData_Activity_SnsActivity;
	12220603: ISheetData_Activity_SnsActivity;
	12220604: ISheetData_Activity_SnsActivity;
	12220605: ISheetData_Activity_SnsActivity;
	12220606: ISheetData_Activity_SnsActivity;
	12220701: ISheetData_Activity_SnsActivity;
	12220702: ISheetData_Activity_SnsActivity;
	12220703: ISheetData_Activity_SnsActivity;
	12220704: ISheetData_Activity_SnsActivity;
	12220705: ISheetData_Activity_SnsActivity;
	12220706: ISheetData_Activity_SnsActivity;
	12220707: ISheetData_Activity_SnsActivity;
	12220708: ISheetData_Activity_SnsActivity;
	12220709: ISheetData_Activity_SnsActivity;
	12220801: ISheetData_Activity_SnsActivity;
	12220802: ISheetData_Activity_SnsActivity;
	12220803: ISheetData_Activity_SnsActivity;
	12220804: ISheetData_Activity_SnsActivity;
	12220805: ISheetData_Activity_SnsActivity;
	12220806: ISheetData_Activity_SnsActivity;
	12220807: ISheetData_Activity_SnsActivity;
	12220808: ISheetData_Activity_SnsActivity;
	12220809: ISheetData_Activity_SnsActivity;
	12220901: ISheetData_Activity_SnsActivity;
	12220902: ISheetData_Activity_SnsActivity;
	12220903: ISheetData_Activity_SnsActivity;
	12220904: ISheetData_Activity_SnsActivity;
	12220905: ISheetData_Activity_SnsActivity;
	12220906: ISheetData_Activity_SnsActivity;
	12220907: ISheetData_Activity_SnsActivity;
	12220908: ISheetData_Activity_SnsActivity;
	12220909: ISheetData_Activity_SnsActivity;
	12221001: ISheetData_Activity_SnsActivity;
	12221002: ISheetData_Activity_SnsActivity;
	12221003: ISheetData_Activity_SnsActivity;
	12221004: ISheetData_Activity_SnsActivity;
	12221005: ISheetData_Activity_SnsActivity;
	12221006: ISheetData_Activity_SnsActivity;
	12221007: ISheetData_Activity_SnsActivity;
	12440101: ISheetData_Activity_SnsActivity;
	12440102: ISheetData_Activity_SnsActivity;
	12440108: ISheetData_Activity_SnsActivity;
	12440109: ISheetData_Activity_SnsActivity;
	12440110: ISheetData_Activity_SnsActivity;
	12440111: ISheetData_Activity_SnsActivity;
	12440112: ISheetData_Activity_SnsActivity;
	12440201: ISheetData_Activity_SnsActivity;
	12440202: ISheetData_Activity_SnsActivity;
	12440203: ISheetData_Activity_SnsActivity;
	12440204: ISheetData_Activity_SnsActivity;
	12440205: ISheetData_Activity_SnsActivity;
	12440206: ISheetData_Activity_SnsActivity;
	12440207: ISheetData_Activity_SnsActivity;
	12440208: ISheetData_Activity_SnsActivity;
	12440209: ISheetData_Activity_SnsActivity;
	12440210: ISheetData_Activity_SnsActivity;
	12440301: ISheetData_Activity_SnsActivity;
	12440302: ISheetData_Activity_SnsActivity;
	12440303: ISheetData_Activity_SnsActivity;
	12440304: ISheetData_Activity_SnsActivity;
	12440305: ISheetData_Activity_SnsActivity;
	12440306: ISheetData_Activity_SnsActivity;
	12440307: ISheetData_Activity_SnsActivity;
	12440308: ISheetData_Activity_SnsActivity;
	12440309: ISheetData_Activity_SnsActivity;
	12440310: ISheetData_Activity_SnsActivity;
	12440311: ISheetData_Activity_SnsActivity;
	12440401: ISheetData_Activity_SnsActivity;
	12440402: ISheetData_Activity_SnsActivity;
	12440403: ISheetData_Activity_SnsActivity;
	12440404: ISheetData_Activity_SnsActivity;
	12440405: ISheetData_Activity_SnsActivity;
	12440406: ISheetData_Activity_SnsActivity;
	12440407: ISheetData_Activity_SnsActivity;
	12440408: ISheetData_Activity_SnsActivity;
	12440409: ISheetData_Activity_SnsActivity;
	12440501: ISheetData_Activity_SnsActivity;
	12440502: ISheetData_Activity_SnsActivity;
	12440503: ISheetData_Activity_SnsActivity;
	12440504: ISheetData_Activity_SnsActivity;
	12440505: ISheetData_Activity_SnsActivity;
	12440506: ISheetData_Activity_SnsActivity;
	12440507: ISheetData_Activity_SnsActivity;
	12441101: ISheetData_Activity_SnsActivity;
	12441102: ISheetData_Activity_SnsActivity;
	12441103: ISheetData_Activity_SnsActivity;
	12441104: ISheetData_Activity_SnsActivity;
	12441105: ISheetData_Activity_SnsActivity;
	12441106: ISheetData_Activity_SnsActivity;
	12441107: ISheetData_Activity_SnsActivity;
	12441108: ISheetData_Activity_SnsActivity;
	12441109: ISheetData_Activity_SnsActivity;
	12441110: ISheetData_Activity_SnsActivity;
	12441111: ISheetData_Activity_SnsActivity;
	12441112: ISheetData_Activity_SnsActivity;
	12441113: ISheetData_Activity_SnsActivity;
	12441114: ISheetData_Activity_SnsActivity;
	12441115: ISheetData_Activity_SnsActivity;
	12441201: ISheetData_Activity_SnsActivity;
	12441202: ISheetData_Activity_SnsActivity;
	12441203: ISheetData_Activity_SnsActivity;
	12441204: ISheetData_Activity_SnsActivity;
	12441205: ISheetData_Activity_SnsActivity;
	12441206: ISheetData_Activity_SnsActivity;
	12441207: ISheetData_Activity_SnsActivity;
	12441208: ISheetData_Activity_SnsActivity;
	12441209: ISheetData_Activity_SnsActivity;
	12441210: ISheetData_Activity_SnsActivity;
	12441211: ISheetData_Activity_SnsActivity;
	12441212: ISheetData_Activity_SnsActivity;
	12441213: ISheetData_Activity_SnsActivity;
	12441214: ISheetData_Activity_SnsActivity;
	12441215: ISheetData_Activity_SnsActivity;
	12441216: ISheetData_Activity_SnsActivity;
	12441217: ISheetData_Activity_SnsActivity;
	12441218: ISheetData_Activity_SnsActivity;
	12441301: ISheetData_Activity_SnsActivity;
	12441302: ISheetData_Activity_SnsActivity;
	12441303: ISheetData_Activity_SnsActivity;
	12441304: ISheetData_Activity_SnsActivity;
	12441305: ISheetData_Activity_SnsActivity;
	12441306: ISheetData_Activity_SnsActivity;
	12441307: ISheetData_Activity_SnsActivity;
	12441308: ISheetData_Activity_SnsActivity;
	12441309: ISheetData_Activity_SnsActivity;
	12441401: ISheetData_Activity_SnsActivity;
	12441402: ISheetData_Activity_SnsActivity;
	12441403: ISheetData_Activity_SnsActivity;
	12441404: ISheetData_Activity_SnsActivity;
	12441405: ISheetData_Activity_SnsActivity;
	12441406: ISheetData_Activity_SnsActivity;
	12441407: ISheetData_Activity_SnsActivity;
	12441408: ISheetData_Activity_SnsActivity;
	12441409: ISheetData_Activity_SnsActivity;
	12441410: ISheetData_Activity_SnsActivity;
	12441411: ISheetData_Activity_SnsActivity;
	12441412: ISheetData_Activity_SnsActivity;
	12441413: ISheetData_Activity_SnsActivity;
	12441414: ISheetData_Activity_SnsActivity;
	12441415: ISheetData_Activity_SnsActivity;
	12441501: ISheetData_Activity_SnsActivity;
	12441502: ISheetData_Activity_SnsActivity;
	12441503: ISheetData_Activity_SnsActivity;
	12441504: ISheetData_Activity_SnsActivity;
	12441505: ISheetData_Activity_SnsActivity;
	12441506: ISheetData_Activity_SnsActivity;
	12441507: ISheetData_Activity_SnsActivity;
	12441508: ISheetData_Activity_SnsActivity;
	12441509: ISheetData_Activity_SnsActivity;
	12441601: ISheetData_Activity_SnsActivity;
	12441602: ISheetData_Activity_SnsActivity;
	12441603: ISheetData_Activity_SnsActivity;
	12441604: ISheetData_Activity_SnsActivity;
	12441605: ISheetData_Activity_SnsActivity;
	12441606: ISheetData_Activity_SnsActivity;
	12441607: ISheetData_Activity_SnsActivity;
	12441608: ISheetData_Activity_SnsActivity;
	12441701: ISheetData_Activity_SnsActivity;
	12441702: ISheetData_Activity_SnsActivity;
	12441703: ISheetData_Activity_SnsActivity;
	12441704: ISheetData_Activity_SnsActivity;
	12441705: ISheetData_Activity_SnsActivity;
	12441706: ISheetData_Activity_SnsActivity;
	12441707: ISheetData_Activity_SnsActivity;
	12441708: ISheetData_Activity_SnsActivity;
	12441709: ISheetData_Activity_SnsActivity;
	12441801: ISheetData_Activity_SnsActivity;
	12441802: ISheetData_Activity_SnsActivity;
	12441803: ISheetData_Activity_SnsActivity;
	12441804: ISheetData_Activity_SnsActivity;
	12441805: ISheetData_Activity_SnsActivity;
	12441806: ISheetData_Activity_SnsActivity;
	12441807: ISheetData_Activity_SnsActivity;
	12441808: ISheetData_Activity_SnsActivity;
	12441809: ISheetData_Activity_SnsActivity;
	12441901: ISheetData_Activity_SnsActivity;
	12441902: ISheetData_Activity_SnsActivity;
	12441903: ISheetData_Activity_SnsActivity;
	12441904: ISheetData_Activity_SnsActivity;
	12441905: ISheetData_Activity_SnsActivity;
	12441906: ISheetData_Activity_SnsActivity;
	12441907: ISheetData_Activity_SnsActivity;
	12441908: ISheetData_Activity_SnsActivity;
	12441909: ISheetData_Activity_SnsActivity;
	12442001: ISheetData_Activity_SnsActivity;
	12442002: ISheetData_Activity_SnsActivity;
	12442003: ISheetData_Activity_SnsActivity;
	12442004: ISheetData_Activity_SnsActivity;
	12442005: ISheetData_Activity_SnsActivity;
	12442006: ISheetData_Activity_SnsActivity;
	12442007: ISheetData_Activity_SnsActivity;
	12442008: ISheetData_Activity_SnsActivity;
	12442009: ISheetData_Activity_SnsActivity;
	12442010: ISheetData_Activity_SnsActivity;
	12442011: ISheetData_Activity_SnsActivity;
	12442012: ISheetData_Activity_SnsActivity;
	12442013: ISheetData_Activity_SnsActivity;
	22110101: ISheetData_Activity_SnsActivity;
	22110102: ISheetData_Activity_SnsActivity;
	22110103: ISheetData_Activity_SnsActivity;
	22110104: ISheetData_Activity_SnsActivity;
	22110105: ISheetData_Activity_SnsActivity;
	22110106: ISheetData_Activity_SnsActivity;
	22110107: ISheetData_Activity_SnsActivity;
	22110108: ISheetData_Activity_SnsActivity;
	22110109: ISheetData_Activity_SnsActivity;
	22110110: ISheetData_Activity_SnsActivity;
	22110111: ISheetData_Activity_SnsActivity;
	22110112: ISheetData_Activity_SnsActivity;
	22110113: ISheetData_Activity_SnsActivity;
	22110114: ISheetData_Activity_SnsActivity;
	22110115: ISheetData_Activity_SnsActivity;
	22110116: ISheetData_Activity_SnsActivity;
	22110117: ISheetData_Activity_SnsActivity;
	22110201: ISheetData_Activity_SnsActivity;
	22110202: ISheetData_Activity_SnsActivity;
	22110203: ISheetData_Activity_SnsActivity;
	22110204: ISheetData_Activity_SnsActivity;
	22110205: ISheetData_Activity_SnsActivity;
	22110206: ISheetData_Activity_SnsActivity;
	22110207: ISheetData_Activity_SnsActivity;
	22110208: ISheetData_Activity_SnsActivity;
	22110209: ISheetData_Activity_SnsActivity;
	22110210: ISheetData_Activity_SnsActivity;
	22110211: ISheetData_Activity_SnsActivity;
	22110212: ISheetData_Activity_SnsActivity;
	22110213: ISheetData_Activity_SnsActivity;
	22110214: ISheetData_Activity_SnsActivity;
	22110215: ISheetData_Activity_SnsActivity;
	22110216: ISheetData_Activity_SnsActivity;
	22110217: ISheetData_Activity_SnsActivity;
	22110218: ISheetData_Activity_SnsActivity;
	22110219: ISheetData_Activity_SnsActivity;
	22110301: ISheetData_Activity_SnsActivity;
	22110302: ISheetData_Activity_SnsActivity;
	22110303: ISheetData_Activity_SnsActivity;
	22110304: ISheetData_Activity_SnsActivity;
	22110305: ISheetData_Activity_SnsActivity;
	22110306: ISheetData_Activity_SnsActivity;
	22110307: ISheetData_Activity_SnsActivity;
	22110308: ISheetData_Activity_SnsActivity;
	22110309: ISheetData_Activity_SnsActivity;
	22110310: ISheetData_Activity_SnsActivity;
	22110401: ISheetData_Activity_SnsActivity;
	22110402: ISheetData_Activity_SnsActivity;
	22110403: ISheetData_Activity_SnsActivity;
	22110404: ISheetData_Activity_SnsActivity;
	22110405: ISheetData_Activity_SnsActivity;
	22110406: ISheetData_Activity_SnsActivity;
	22110407: ISheetData_Activity_SnsActivity;
	22110408: ISheetData_Activity_SnsActivity;
	22110409: ISheetData_Activity_SnsActivity;
	22110410: ISheetData_Activity_SnsActivity;
	22110411: ISheetData_Activity_SnsActivity;
	22110412: ISheetData_Activity_SnsActivity;
	22110413: ISheetData_Activity_SnsActivity;
	22110414: ISheetData_Activity_SnsActivity;
	22110501: ISheetData_Activity_SnsActivity;
	22110502: ISheetData_Activity_SnsActivity;
	22110503: ISheetData_Activity_SnsActivity;
	22110504: ISheetData_Activity_SnsActivity;
	22110505: ISheetData_Activity_SnsActivity;
	22110506: ISheetData_Activity_SnsActivity;
	22110507: ISheetData_Activity_SnsActivity;
	22110508: ISheetData_Activity_SnsActivity;
	22110509: ISheetData_Activity_SnsActivity;
	22110510: ISheetData_Activity_SnsActivity;
	22110511: ISheetData_Activity_SnsActivity;
	22110512: ISheetData_Activity_SnsActivity;
	22110601: ISheetData_Activity_SnsActivity;
	22110602: ISheetData_Activity_SnsActivity;
	22110603: ISheetData_Activity_SnsActivity;
	22110604: ISheetData_Activity_SnsActivity;
	22110605: ISheetData_Activity_SnsActivity;
	22110606: ISheetData_Activity_SnsActivity;
	22110607: ISheetData_Activity_SnsActivity;
	22110608: ISheetData_Activity_SnsActivity;
	22110609: ISheetData_Activity_SnsActivity;
	22110610: ISheetData_Activity_SnsActivity;
	22110611: ISheetData_Activity_SnsActivity;
	22110612: ISheetData_Activity_SnsActivity;
	22110613: ISheetData_Activity_SnsActivity;
	22110614: ISheetData_Activity_SnsActivity;
	22110615: ISheetData_Activity_SnsActivity;
	22110616: ISheetData_Activity_SnsActivity;
	22110617: ISheetData_Activity_SnsActivity;
	22110618: ISheetData_Activity_SnsActivity;
	22110619: ISheetData_Activity_SnsActivity;
	22110620: ISheetData_Activity_SnsActivity;
	22170101: ISheetData_Activity_SnsActivity;
	22170102: ISheetData_Activity_SnsActivity;
	22170103: ISheetData_Activity_SnsActivity;
	22170104: ISheetData_Activity_SnsActivity;
	22170105: ISheetData_Activity_SnsActivity;
	22170106: ISheetData_Activity_SnsActivity;
	22170107: ISheetData_Activity_SnsActivity;
	22170108: ISheetData_Activity_SnsActivity;
	22170109: ISheetData_Activity_SnsActivity;
	22170110: ISheetData_Activity_SnsActivity;
	22170111: ISheetData_Activity_SnsActivity;
	22170112: ISheetData_Activity_SnsActivity;
	22170113: ISheetData_Activity_SnsActivity;
	22170114: ISheetData_Activity_SnsActivity;
	22170115: ISheetData_Activity_SnsActivity;
	22170116: ISheetData_Activity_SnsActivity;
	22170117: ISheetData_Activity_SnsActivity;
	22170118: ISheetData_Activity_SnsActivity;
	22170201: ISheetData_Activity_SnsActivity;
	22170202: ISheetData_Activity_SnsActivity;
	22170203: ISheetData_Activity_SnsActivity;
	22170204: ISheetData_Activity_SnsActivity;
	22170205: ISheetData_Activity_SnsActivity;
	22170206: ISheetData_Activity_SnsActivity;
	22170207: ISheetData_Activity_SnsActivity;
	22170208: ISheetData_Activity_SnsActivity;
	22170209: ISheetData_Activity_SnsActivity;
	22170210: ISheetData_Activity_SnsActivity;
	22170211: ISheetData_Activity_SnsActivity;
	22170212: ISheetData_Activity_SnsActivity;
	22170213: ISheetData_Activity_SnsActivity;
	22170214: ISheetData_Activity_SnsActivity;
	22170215: ISheetData_Activity_SnsActivity;
	22170216: ISheetData_Activity_SnsActivity;
	22170301: ISheetData_Activity_SnsActivity;
	22170302: ISheetData_Activity_SnsActivity;
	22170303: ISheetData_Activity_SnsActivity;
	22170304: ISheetData_Activity_SnsActivity;
	22170305: ISheetData_Activity_SnsActivity;
	22170306: ISheetData_Activity_SnsActivity;
	22170307: ISheetData_Activity_SnsActivity;
	22170308: ISheetData_Activity_SnsActivity;
	22170309: ISheetData_Activity_SnsActivity;
	22170310: ISheetData_Activity_SnsActivity;
	22170311: ISheetData_Activity_SnsActivity;
	22170312: ISheetData_Activity_SnsActivity;
	22170401: ISheetData_Activity_SnsActivity;
	22170402: ISheetData_Activity_SnsActivity;
	22170403: ISheetData_Activity_SnsActivity;
	22170404: ISheetData_Activity_SnsActivity;
	22170405: ISheetData_Activity_SnsActivity;
	22170406: ISheetData_Activity_SnsActivity;
	22170407: ISheetData_Activity_SnsActivity;
	22170408: ISheetData_Activity_SnsActivity;
	22170409: ISheetData_Activity_SnsActivity;
	22170410: ISheetData_Activity_SnsActivity;
	22170411: ISheetData_Activity_SnsActivity;
	22170412: ISheetData_Activity_SnsActivity;
	22170413: ISheetData_Activity_SnsActivity;
	22170414: ISheetData_Activity_SnsActivity;
	22170501: ISheetData_Activity_SnsActivity;
	22170502: ISheetData_Activity_SnsActivity;
	22170503: ISheetData_Activity_SnsActivity;
	22170504: ISheetData_Activity_SnsActivity;
	22170505: ISheetData_Activity_SnsActivity;
	22170506: ISheetData_Activity_SnsActivity;
	22170507: ISheetData_Activity_SnsActivity;
	22170508: ISheetData_Activity_SnsActivity;
	22170509: ISheetData_Activity_SnsActivity;
	22170510: ISheetData_Activity_SnsActivity;
	22170511: ISheetData_Activity_SnsActivity;
	22170512: ISheetData_Activity_SnsActivity;
	22170513: ISheetData_Activity_SnsActivity;
	22170514: ISheetData_Activity_SnsActivity;
	22170515: ISheetData_Activity_SnsActivity;
	22170601: ISheetData_Activity_SnsActivity;
	22170602: ISheetData_Activity_SnsActivity;
	22170603: ISheetData_Activity_SnsActivity;
	22170604: ISheetData_Activity_SnsActivity;
	22170605: ISheetData_Activity_SnsActivity;
	22170606: ISheetData_Activity_SnsActivity;
	22170607: ISheetData_Activity_SnsActivity;
	22170608: ISheetData_Activity_SnsActivity;
	22170609: ISheetData_Activity_SnsActivity;
	22170701: ISheetData_Activity_SnsActivity;
	22170702: ISheetData_Activity_SnsActivity;
	22170703: ISheetData_Activity_SnsActivity;
	22170704: ISheetData_Activity_SnsActivity;
	22170705: ISheetData_Activity_SnsActivity;
	22170706: ISheetData_Activity_SnsActivity;
	22170707: ISheetData_Activity_SnsActivity;
	22170708: ISheetData_Activity_SnsActivity;
	22170709: ISheetData_Activity_SnsActivity;
	22170710: ISheetData_Activity_SnsActivity;
	22170711: ISheetData_Activity_SnsActivity;
	22170712: ISheetData_Activity_SnsActivity;
	22170713: ISheetData_Activity_SnsActivity;
	22170714: ISheetData_Activity_SnsActivity;
	22170715: ISheetData_Activity_SnsActivity;
	22170716: ISheetData_Activity_SnsActivity;
	22170717: ISheetData_Activity_SnsActivity;
	22170801: ISheetData_Activity_SnsActivity;
	22170802: ISheetData_Activity_SnsActivity;
	22170803: ISheetData_Activity_SnsActivity;
	22170804: ISheetData_Activity_SnsActivity;
	22170805: ISheetData_Activity_SnsActivity;
	22170806: ISheetData_Activity_SnsActivity;
	22170807: ISheetData_Activity_SnsActivity;
	22170808: ISheetData_Activity_SnsActivity;
	22170809: ISheetData_Activity_SnsActivity;
	22170810: ISheetData_Activity_SnsActivity;
	22170811: ISheetData_Activity_SnsActivity;
	22170812: ISheetData_Activity_SnsActivity;
	22170901: ISheetData_Activity_SnsActivity;
	22170902: ISheetData_Activity_SnsActivity;
	22170903: ISheetData_Activity_SnsActivity;
	22170904: ISheetData_Activity_SnsActivity;
	22170905: ISheetData_Activity_SnsActivity;
	22170906: ISheetData_Activity_SnsActivity;
	22170907: ISheetData_Activity_SnsActivity;
	22170908: ISheetData_Activity_SnsActivity;
	22170909: ISheetData_Activity_SnsActivity;
	22170910: ISheetData_Activity_SnsActivity;
	22170911: ISheetData_Activity_SnsActivity;
	22170912: ISheetData_Activity_SnsActivity;
	22170913: ISheetData_Activity_SnsActivity;
	22170914: ISheetData_Activity_SnsActivity;
	22170915: ISheetData_Activity_SnsActivity;
	22171001: ISheetData_Activity_SnsActivity;
	22171002: ISheetData_Activity_SnsActivity;
	22171003: ISheetData_Activity_SnsActivity;
	22171004: ISheetData_Activity_SnsActivity;
	22171005: ISheetData_Activity_SnsActivity;
	22171006: ISheetData_Activity_SnsActivity;
	22171007: ISheetData_Activity_SnsActivity;
	22171008: ISheetData_Activity_SnsActivity;
	22171009: ISheetData_Activity_SnsActivity;
	22171010: ISheetData_Activity_SnsActivity;
	22171011: ISheetData_Activity_SnsActivity;
	22920101: ISheetData_Activity_SnsActivity;
	22920102: ISheetData_Activity_SnsActivity;
	22920103: ISheetData_Activity_SnsActivity;
	22920104: ISheetData_Activity_SnsActivity;
	22920105: ISheetData_Activity_SnsActivity;
	22920106: ISheetData_Activity_SnsActivity;
	22920107: ISheetData_Activity_SnsActivity;
	22920108: ISheetData_Activity_SnsActivity;
	22920109: ISheetData_Activity_SnsActivity;
	22920110: ISheetData_Activity_SnsActivity;
	22920111: ISheetData_Activity_SnsActivity;
	22920112: ISheetData_Activity_SnsActivity;
	22920113: ISheetData_Activity_SnsActivity;
	22920114: ISheetData_Activity_SnsActivity;
	22920115: ISheetData_Activity_SnsActivity;
	22920116: ISheetData_Activity_SnsActivity;
	22920117: ISheetData_Activity_SnsActivity;
	22920201: ISheetData_Activity_SnsActivity;
	22920202: ISheetData_Activity_SnsActivity;
	22920203: ISheetData_Activity_SnsActivity;
	22920204: ISheetData_Activity_SnsActivity;
	22920205: ISheetData_Activity_SnsActivity;
	22920206: ISheetData_Activity_SnsActivity;
	22920207: ISheetData_Activity_SnsActivity;
	22920208: ISheetData_Activity_SnsActivity;
	22920209: ISheetData_Activity_SnsActivity;
	22920210: ISheetData_Activity_SnsActivity;
	22920211: ISheetData_Activity_SnsActivity;
	22920301: ISheetData_Activity_SnsActivity;
	22920302: ISheetData_Activity_SnsActivity;
	22920303: ISheetData_Activity_SnsActivity;
	22920304: ISheetData_Activity_SnsActivity;
	22920305: ISheetData_Activity_SnsActivity;
	22920306: ISheetData_Activity_SnsActivity;
	22920307: ISheetData_Activity_SnsActivity;
	22920308: ISheetData_Activity_SnsActivity;
	22920309: ISheetData_Activity_SnsActivity;
	22920310: ISheetData_Activity_SnsActivity;
	22920311: ISheetData_Activity_SnsActivity;
	22920312: ISheetData_Activity_SnsActivity;
	22920313: ISheetData_Activity_SnsActivity;
	22920314: ISheetData_Activity_SnsActivity;
	22920315: ISheetData_Activity_SnsActivity;
	22920316: ISheetData_Activity_SnsActivity;
	22920317: ISheetData_Activity_SnsActivity;
	22920318: ISheetData_Activity_SnsActivity;
	22920319: ISheetData_Activity_SnsActivity;
	22920320: ISheetData_Activity_SnsActivity;
	22920401: ISheetData_Activity_SnsActivity;
	22920402: ISheetData_Activity_SnsActivity;
	22920403: ISheetData_Activity_SnsActivity;
	22920404: ISheetData_Activity_SnsActivity;
	22920405: ISheetData_Activity_SnsActivity;
	22920406: ISheetData_Activity_SnsActivity;
	22920407: ISheetData_Activity_SnsActivity;
	22920408: ISheetData_Activity_SnsActivity;
	22920409: ISheetData_Activity_SnsActivity;
	22920410: ISheetData_Activity_SnsActivity;
	22920411: ISheetData_Activity_SnsActivity;
	22920412: ISheetData_Activity_SnsActivity;
	22920413: ISheetData_Activity_SnsActivity;
	22920414: ISheetData_Activity_SnsActivity;
	22920501: ISheetData_Activity_SnsActivity;
	22920502: ISheetData_Activity_SnsActivity;
	22920503: ISheetData_Activity_SnsActivity;
	22920504: ISheetData_Activity_SnsActivity;
	22920505: ISheetData_Activity_SnsActivity;
	22920506: ISheetData_Activity_SnsActivity;
	22920507: ISheetData_Activity_SnsActivity;
	22920508: ISheetData_Activity_SnsActivity;
	22920509: ISheetData_Activity_SnsActivity;
	22920510: ISheetData_Activity_SnsActivity;
	22920511: ISheetData_Activity_SnsActivity;
	22920512: ISheetData_Activity_SnsActivity;
	22920513: ISheetData_Activity_SnsActivity;
	22920514: ISheetData_Activity_SnsActivity;
	22920515: ISheetData_Activity_SnsActivity;
	22920516: ISheetData_Activity_SnsActivity;
	22920601: ISheetData_Activity_SnsActivity;
	22920602: ISheetData_Activity_SnsActivity;
	22920603: ISheetData_Activity_SnsActivity;
	22920604: ISheetData_Activity_SnsActivity;
	22920605: ISheetData_Activity_SnsActivity;
	22920606: ISheetData_Activity_SnsActivity;
	22920607: ISheetData_Activity_SnsActivity;
	22920608: ISheetData_Activity_SnsActivity;
	22920609: ISheetData_Activity_SnsActivity;
	22920610: ISheetData_Activity_SnsActivity;
	22920611: ISheetData_Activity_SnsActivity;
	22920701: ISheetData_Activity_SnsActivity;
	22920702: ISheetData_Activity_SnsActivity;
	22920703: ISheetData_Activity_SnsActivity;
	22920704: ISheetData_Activity_SnsActivity;
	22920705: ISheetData_Activity_SnsActivity;
	22920706: ISheetData_Activity_SnsActivity;
	22920707: ISheetData_Activity_SnsActivity;
	22920708: ISheetData_Activity_SnsActivity;
	22920709: ISheetData_Activity_SnsActivity;
	23050101: ISheetData_Activity_SnsActivity;
	23050102: ISheetData_Activity_SnsActivity;
	23050103: ISheetData_Activity_SnsActivity;
	23050104: ISheetData_Activity_SnsActivity;
	23050105: ISheetData_Activity_SnsActivity;
	23050106: ISheetData_Activity_SnsActivity;
	23050107: ISheetData_Activity_SnsActivity;
	23050108: ISheetData_Activity_SnsActivity;
	23050109: ISheetData_Activity_SnsActivity;
	23050110: ISheetData_Activity_SnsActivity;
	23050111: ISheetData_Activity_SnsActivity;
	23050201: ISheetData_Activity_SnsActivity;
	23050202: ISheetData_Activity_SnsActivity;
	23050203: ISheetData_Activity_SnsActivity;
	23050204: ISheetData_Activity_SnsActivity;
	23050205: ISheetData_Activity_SnsActivity;
	23050206: ISheetData_Activity_SnsActivity;
	23050207: ISheetData_Activity_SnsActivity;
	23050208: ISheetData_Activity_SnsActivity;
	23050209: ISheetData_Activity_SnsActivity;
	23050210: ISheetData_Activity_SnsActivity;
	23050211: ISheetData_Activity_SnsActivity;
	23050212: ISheetData_Activity_SnsActivity;
	23050301: ISheetData_Activity_SnsActivity;
	23050302: ISheetData_Activity_SnsActivity;
	23050303: ISheetData_Activity_SnsActivity;
	23050304: ISheetData_Activity_SnsActivity;
	23050305: ISheetData_Activity_SnsActivity;
	23050306: ISheetData_Activity_SnsActivity;
	23050307: ISheetData_Activity_SnsActivity;
	23050308: ISheetData_Activity_SnsActivity;
	23050401: ISheetData_Activity_SnsActivity;
	23050402: ISheetData_Activity_SnsActivity;
	23050403: ISheetData_Activity_SnsActivity;
	23050404: ISheetData_Activity_SnsActivity;
	23050405: ISheetData_Activity_SnsActivity;
	23050406: ISheetData_Activity_SnsActivity;
	23050407: ISheetData_Activity_SnsActivity;
	23050408: ISheetData_Activity_SnsActivity;
	23050409: ISheetData_Activity_SnsActivity;
	23050501: ISheetData_Activity_SnsActivity;
	23050502: ISheetData_Activity_SnsActivity;
	23050503: ISheetData_Activity_SnsActivity;
	23050504: ISheetData_Activity_SnsActivity;
	23050505: ISheetData_Activity_SnsActivity;
	23050506: ISheetData_Activity_SnsActivity;
	23050507: ISheetData_Activity_SnsActivity;
	23050508: ISheetData_Activity_SnsActivity;
	23050509: ISheetData_Activity_SnsActivity;
	23050510: ISheetData_Activity_SnsActivity;
	23050511: ISheetData_Activity_SnsActivity;
	23050512: ISheetData_Activity_SnsActivity;
	23050513: ISheetData_Activity_SnsActivity;
	23050514: ISheetData_Activity_SnsActivity;
	23050601: ISheetData_Activity_SnsActivity;
	23050602: ISheetData_Activity_SnsActivity;
	23050603: ISheetData_Activity_SnsActivity;
	23050604: ISheetData_Activity_SnsActivity;
	23050605: ISheetData_Activity_SnsActivity;
	23050606: ISheetData_Activity_SnsActivity;
	23050607: ISheetData_Activity_SnsActivity;
	23050608: ISheetData_Activity_SnsActivity;
	23050609: ISheetData_Activity_SnsActivity;
	23050701: ISheetData_Activity_SnsActivity;
	23050702: ISheetData_Activity_SnsActivity;
	23050703: ISheetData_Activity_SnsActivity;
	23050704: ISheetData_Activity_SnsActivity;
	23050705: ISheetData_Activity_SnsActivity;
	23050706: ISheetData_Activity_SnsActivity;
	23050707: ISheetData_Activity_SnsActivity;
	23050708: ISheetData_Activity_SnsActivity;
	23050709: ISheetData_Activity_SnsActivity;
	23050710: ISheetData_Activity_SnsActivity;
	23050711: ISheetData_Activity_SnsActivity;
	23050712: ISheetData_Activity_SnsActivity;
	23050713: ISheetData_Activity_SnsActivity;
	23050714: ISheetData_Activity_SnsActivity;
	23050715: ISheetData_Activity_SnsActivity;
	23050716: ISheetData_Activity_SnsActivity;
	23050717: ISheetData_Activity_SnsActivity;
	23050801: ISheetData_Activity_SnsActivity;
	23050802: ISheetData_Activity_SnsActivity;
	23050803: ISheetData_Activity_SnsActivity;
	23050804: ISheetData_Activity_SnsActivity;
	23050805: ISheetData_Activity_SnsActivity;
	23050806: ISheetData_Activity_SnsActivity;
	23050807: ISheetData_Activity_SnsActivity;
	23050808: ISheetData_Activity_SnsActivity;
	23050809: ISheetData_Activity_SnsActivity;
	23050810: ISheetData_Activity_SnsActivity;
	23050811: ISheetData_Activity_SnsActivity;
	23050812: ISheetData_Activity_SnsActivity;
	23050901: ISheetData_Activity_SnsActivity;
	23050902: ISheetData_Activity_SnsActivity;
	23050903: ISheetData_Activity_SnsActivity;
	23050904: ISheetData_Activity_SnsActivity;
	23050905: ISheetData_Activity_SnsActivity;
	23050906: ISheetData_Activity_SnsActivity;
	23050907: ISheetData_Activity_SnsActivity;
	23050908: ISheetData_Activity_SnsActivity;
	23050909: ISheetData_Activity_SnsActivity;
	23051001: ISheetData_Activity_SnsActivity;
	23051002: ISheetData_Activity_SnsActivity;
	23051003: ISheetData_Activity_SnsActivity;
	23051004: ISheetData_Activity_SnsActivity;
	23051005: ISheetData_Activity_SnsActivity;
	23051006: ISheetData_Activity_SnsActivity;
	23051007: ISheetData_Activity_SnsActivity;
	23051008: ISheetData_Activity_SnsActivity;
	23051009: ISheetData_Activity_SnsActivity;
	23051010: ISheetData_Activity_SnsActivity;
	23051011: ISheetData_Activity_SnsActivity;
	23051101: ISheetData_Activity_SnsActivity;
	23051102: ISheetData_Activity_SnsActivity;
	23051103: ISheetData_Activity_SnsActivity;
	23051104: ISheetData_Activity_SnsActivity;
	23051105: ISheetData_Activity_SnsActivity;
	23051106: ISheetData_Activity_SnsActivity;
	23051107: ISheetData_Activity_SnsActivity;
	23051201: ISheetData_Activity_SnsActivity;
	23051202: ISheetData_Activity_SnsActivity;
	23051203: ISheetData_Activity_SnsActivity;
	23051204: ISheetData_Activity_SnsActivity;
	23051205: ISheetData_Activity_SnsActivity;
	23051206: ISheetData_Activity_SnsActivity;
	23051207: ISheetData_Activity_SnsActivity;
	23051208: ISheetData_Activity_SnsActivity;
	23051301: ISheetData_Activity_SnsActivity;
	23051302: ISheetData_Activity_SnsActivity;
	23051303: ISheetData_Activity_SnsActivity;
	23051304: ISheetData_Activity_SnsActivity;
	23051305: ISheetData_Activity_SnsActivity;
	23051306: ISheetData_Activity_SnsActivity;
	23051307: ISheetData_Activity_SnsActivity;
	23051308: ISheetData_Activity_SnsActivity;
	23051309: ISheetData_Activity_SnsActivity;
	23051310: ISheetData_Activity_SnsActivity;
	23051311: ISheetData_Activity_SnsActivity;
	23051312: ISheetData_Activity_SnsActivity;
	23051313: ISheetData_Activity_SnsActivity;
	23051401: ISheetData_Activity_SnsActivity;
	23051402: ISheetData_Activity_SnsActivity;
	23051403: ISheetData_Activity_SnsActivity;
	23051404: ISheetData_Activity_SnsActivity;
	23051405: ISheetData_Activity_SnsActivity;
	23051406: ISheetData_Activity_SnsActivity;
	23051407: ISheetData_Activity_SnsActivity;
	23051501: ISheetData_Activity_SnsActivity;
	23051502: ISheetData_Activity_SnsActivity;
	23051503: ISheetData_Activity_SnsActivity;
	23051504: ISheetData_Activity_SnsActivity;
	23051505: ISheetData_Activity_SnsActivity;
	23051506: ISheetData_Activity_SnsActivity;
	23051507: ISheetData_Activity_SnsActivity;
	23051508: ISheetData_Activity_SnsActivity;
	23051509: ISheetData_Activity_SnsActivity;
	23051510: ISheetData_Activity_SnsActivity;
	23051511: ISheetData_Activity_SnsActivity;
	23051512: ISheetData_Activity_SnsActivity;
	23051601: ISheetData_Activity_SnsActivity;
	23051602: ISheetData_Activity_SnsActivity;
	23051603: ISheetData_Activity_SnsActivity;
	23051604: ISheetData_Activity_SnsActivity;
	23051605: ISheetData_Activity_SnsActivity;
	23051606: ISheetData_Activity_SnsActivity;
	23051607: ISheetData_Activity_SnsActivity;
	23051608: ISheetData_Activity_SnsActivity;
	23070101: ISheetData_Activity_SnsActivity;
	23070102: ISheetData_Activity_SnsActivity;
	23070103: ISheetData_Activity_SnsActivity;
	23070104: ISheetData_Activity_SnsActivity;
	23070105: ISheetData_Activity_SnsActivity;
	23070106: ISheetData_Activity_SnsActivity;
	23070107: ISheetData_Activity_SnsActivity;
	23070108: ISheetData_Activity_SnsActivity;
	23070109: ISheetData_Activity_SnsActivity;
	23070110: ISheetData_Activity_SnsActivity;
	23070111: ISheetData_Activity_SnsActivity;
	23070112: ISheetData_Activity_SnsActivity;
	23070113: ISheetData_Activity_SnsActivity;
	23070114: ISheetData_Activity_SnsActivity;
	23070115: ISheetData_Activity_SnsActivity;
	23070116: ISheetData_Activity_SnsActivity;
	23070201: ISheetData_Activity_SnsActivity;
	23070202: ISheetData_Activity_SnsActivity;
	23070203: ISheetData_Activity_SnsActivity;
	23070204: ISheetData_Activity_SnsActivity;
	23070205: ISheetData_Activity_SnsActivity;
	23070206: ISheetData_Activity_SnsActivity;
	23070207: ISheetData_Activity_SnsActivity;
	23070208: ISheetData_Activity_SnsActivity;
	23070209: ISheetData_Activity_SnsActivity;
	23070210: ISheetData_Activity_SnsActivity;
	23070211: ISheetData_Activity_SnsActivity;
	23070212: ISheetData_Activity_SnsActivity;
	23070213: ISheetData_Activity_SnsActivity;
	23070301: ISheetData_Activity_SnsActivity;
	23070302: ISheetData_Activity_SnsActivity;
	23070303: ISheetData_Activity_SnsActivity;
	23070304: ISheetData_Activity_SnsActivity;
	23070305: ISheetData_Activity_SnsActivity;
	23070306: ISheetData_Activity_SnsActivity;
	23070307: ISheetData_Activity_SnsActivity;
	23070308: ISheetData_Activity_SnsActivity;
	23070401: ISheetData_Activity_SnsActivity;
	23070402: ISheetData_Activity_SnsActivity;
	23070403: ISheetData_Activity_SnsActivity;
	23070404: ISheetData_Activity_SnsActivity;
	23070405: ISheetData_Activity_SnsActivity;
	23070406: ISheetData_Activity_SnsActivity;
	23070407: ISheetData_Activity_SnsActivity;
	23070408: ISheetData_Activity_SnsActivity;
	23070409: ISheetData_Activity_SnsActivity;
	23070410: ISheetData_Activity_SnsActivity;
	23070411: ISheetData_Activity_SnsActivity;
	23070412: ISheetData_Activity_SnsActivity;
	23070413: ISheetData_Activity_SnsActivity;
	23070414: ISheetData_Activity_SnsActivity;
	23070415: ISheetData_Activity_SnsActivity;
	23070416: ISheetData_Activity_SnsActivity;
	23070417: ISheetData_Activity_SnsActivity;
	23070418: ISheetData_Activity_SnsActivity;
	23070419: ISheetData_Activity_SnsActivity;
	23070501: ISheetData_Activity_SnsActivity;
	23070502: ISheetData_Activity_SnsActivity;
	23070503: ISheetData_Activity_SnsActivity;
	23070504: ISheetData_Activity_SnsActivity;
	23070505: ISheetData_Activity_SnsActivity;
	23070506: ISheetData_Activity_SnsActivity;
	23070507: ISheetData_Activity_SnsActivity;
	23070508: ISheetData_Activity_SnsActivity;
	23070509: ISheetData_Activity_SnsActivity;
	23070510: ISheetData_Activity_SnsActivity;
	23070511: ISheetData_Activity_SnsActivity;
	23070512: ISheetData_Activity_SnsActivity;
	23070513: ISheetData_Activity_SnsActivity;
	23070514: ISheetData_Activity_SnsActivity;
	23070515: ISheetData_Activity_SnsActivity;
	23070601: ISheetData_Activity_SnsActivity;
	23070602: ISheetData_Activity_SnsActivity;
	23070603: ISheetData_Activity_SnsActivity;
	23070604: ISheetData_Activity_SnsActivity;
	23070605: ISheetData_Activity_SnsActivity;
	23070606: ISheetData_Activity_SnsActivity;
	23070607: ISheetData_Activity_SnsActivity;
	23070608: ISheetData_Activity_SnsActivity;
	23070609: ISheetData_Activity_SnsActivity;
	23070701: ISheetData_Activity_SnsActivity;
	23070702: ISheetData_Activity_SnsActivity;
	23070703: ISheetData_Activity_SnsActivity;
	23070704: ISheetData_Activity_SnsActivity;
	23070705: ISheetData_Activity_SnsActivity;
	23070706: ISheetData_Activity_SnsActivity;
	23070707: ISheetData_Activity_SnsActivity;
	23070708: ISheetData_Activity_SnsActivity;
	23070801: ISheetData_Activity_SnsActivity;
	23070802: ISheetData_Activity_SnsActivity;
	23070803: ISheetData_Activity_SnsActivity;
	23070804: ISheetData_Activity_SnsActivity;
	23070805: ISheetData_Activity_SnsActivity;
	23070806: ISheetData_Activity_SnsActivity;
	23070807: ISheetData_Activity_SnsActivity;
	23070808: ISheetData_Activity_SnsActivity;
	23070809: ISheetData_Activity_SnsActivity;
	23070810: ISheetData_Activity_SnsActivity;
	23070811: ISheetData_Activity_SnsActivity;
	23070812: ISheetData_Activity_SnsActivity;
	23070813: ISheetData_Activity_SnsActivity;
	23070814: ISheetData_Activity_SnsActivity;
	23070815: ISheetData_Activity_SnsActivity;
	23070816: ISheetData_Activity_SnsActivity;
	23070817: ISheetData_Activity_SnsActivity;
	23070901: ISheetData_Activity_SnsActivity;
	23070902: ISheetData_Activity_SnsActivity;
	23070903: ISheetData_Activity_SnsActivity;
	23070904: ISheetData_Activity_SnsActivity;
	23070905: ISheetData_Activity_SnsActivity;
	23070906: ISheetData_Activity_SnsActivity;
	23070907: ISheetData_Activity_SnsActivity;
	23070908: ISheetData_Activity_SnsActivity;
	23070909: ISheetData_Activity_SnsActivity;
	23071001: ISheetData_Activity_SnsActivity;
	23071002: ISheetData_Activity_SnsActivity;
	23071003: ISheetData_Activity_SnsActivity;
	23071004: ISheetData_Activity_SnsActivity;
	23071005: ISheetData_Activity_SnsActivity;
	23071006: ISheetData_Activity_SnsActivity;
	23071007: ISheetData_Activity_SnsActivity;
	23071008: ISheetData_Activity_SnsActivity;
	23071009: ISheetData_Activity_SnsActivity;
	23071010: ISheetData_Activity_SnsActivity;
	23071011: ISheetData_Activity_SnsActivity;
	23071012: ISheetData_Activity_SnsActivity;
	23071013: ISheetData_Activity_SnsActivity;
	23071014: ISheetData_Activity_SnsActivity;
	23071015: ISheetData_Activity_SnsActivity;
	23071016: ISheetData_Activity_SnsActivity;
	23071101: ISheetData_Activity_SnsActivity;
	23071102: ISheetData_Activity_SnsActivity;
	23071103: ISheetData_Activity_SnsActivity;
	23071104: ISheetData_Activity_SnsActivity;
	23071105: ISheetData_Activity_SnsActivity;
	23071106: ISheetData_Activity_SnsActivity;
	23071107: ISheetData_Activity_SnsActivity;
	23071108: ISheetData_Activity_SnsActivity;
	23071201: ISheetData_Activity_SnsActivity;
	23071202: ISheetData_Activity_SnsActivity;
	23071203: ISheetData_Activity_SnsActivity;
	23071204: ISheetData_Activity_SnsActivity;
	23071205: ISheetData_Activity_SnsActivity;
	23071206: ISheetData_Activity_SnsActivity;
	23071207: ISheetData_Activity_SnsActivity;
	23071208: ISheetData_Activity_SnsActivity;
	23071209: ISheetData_Activity_SnsActivity;
	23071210: ISheetData_Activity_SnsActivity;
	23071211: ISheetData_Activity_SnsActivity;
	23071212: ISheetData_Activity_SnsActivity;
	23071213: ISheetData_Activity_SnsActivity;
	23071214: ISheetData_Activity_SnsActivity;
	23071215: ISheetData_Activity_SnsActivity;
	23071216: ISheetData_Activity_SnsActivity;
	23071301: ISheetData_Activity_SnsActivity;
	23071302: ISheetData_Activity_SnsActivity;
	23071303: ISheetData_Activity_SnsActivity;
	23071304: ISheetData_Activity_SnsActivity;
	23071305: ISheetData_Activity_SnsActivity;
	23071306: ISheetData_Activity_SnsActivity;
	23071307: ISheetData_Activity_SnsActivity;
	23071308: ISheetData_Activity_SnsActivity;
	23071309: ISheetData_Activity_SnsActivity;
	23071310: ISheetData_Activity_SnsActivity;
	23071311: ISheetData_Activity_SnsActivity;
	23071401: ISheetData_Activity_SnsActivity;
	23071402: ISheetData_Activity_SnsActivity;
	23071403: ISheetData_Activity_SnsActivity;
	23071404: ISheetData_Activity_SnsActivity;
	23071405: ISheetData_Activity_SnsActivity;
	23071406: ISheetData_Activity_SnsActivity;
	23071407: ISheetData_Activity_SnsActivity;
	23071408: ISheetData_Activity_SnsActivity;
	23071409: ISheetData_Activity_SnsActivity;
	23071410: ISheetData_Activity_SnsActivity;
	23071411: ISheetData_Activity_SnsActivity;
	23071412: ISheetData_Activity_SnsActivity;
	23071413: ISheetData_Activity_SnsActivity;
	23071414: ISheetData_Activity_SnsActivity;
	23071415: ISheetData_Activity_SnsActivity;
	23071501: ISheetData_Activity_SnsActivity;
	23071502: ISheetData_Activity_SnsActivity;
	23071503: ISheetData_Activity_SnsActivity;
	23071504: ISheetData_Activity_SnsActivity;
	23071505: ISheetData_Activity_SnsActivity;
	23071506: ISheetData_Activity_SnsActivity;
	23071507: ISheetData_Activity_SnsActivity;
	23071508: ISheetData_Activity_SnsActivity;
	23071509: ISheetData_Activity_SnsActivity;
	23071510: ISheetData_Activity_SnsActivity;
	23071511: ISheetData_Activity_SnsActivity;
	23071512: ISheetData_Activity_SnsActivity;
	23071513: ISheetData_Activity_SnsActivity;
	23071601: ISheetData_Activity_SnsActivity;
	23071602: ISheetData_Activity_SnsActivity;
	23071603: ISheetData_Activity_SnsActivity;
	23071604: ISheetData_Activity_SnsActivity;
	23071605: ISheetData_Activity_SnsActivity;
	23071606: ISheetData_Activity_SnsActivity;
	23071607: ISheetData_Activity_SnsActivity;
	23071608: ISheetData_Activity_SnsActivity;
	23071609: ISheetData_Activity_SnsActivity;
	23071701: ISheetData_Activity_SnsActivity;
	23071702: ISheetData_Activity_SnsActivity;
	23071703: ISheetData_Activity_SnsActivity;
	23071704: ISheetData_Activity_SnsActivity;
	23071705: ISheetData_Activity_SnsActivity;
	23071706: ISheetData_Activity_SnsActivity;
	23071707: ISheetData_Activity_SnsActivity;
	23071708: ISheetData_Activity_SnsActivity;
	23071709: ISheetData_Activity_SnsActivity;
	23071710: ISheetData_Activity_SnsActivity;
	23071801: ISheetData_Activity_SnsActivity;
	23071802: ISheetData_Activity_SnsActivity;
	23071803: ISheetData_Activity_SnsActivity;
	23071804: ISheetData_Activity_SnsActivity;
	23071805: ISheetData_Activity_SnsActivity;
	23071806: ISheetData_Activity_SnsActivity;
	23071807: ISheetData_Activity_SnsActivity;
	23071808: ISheetData_Activity_SnsActivity;
	23071809: ISheetData_Activity_SnsActivity;
	23071810: ISheetData_Activity_SnsActivity;
	23071811: ISheetData_Activity_SnsActivity;
	23071812: ISheetData_Activity_SnsActivity;
	23071813: ISheetData_Activity_SnsActivity;
	23071814: ISheetData_Activity_SnsActivity;
	23071815: ISheetData_Activity_SnsActivity;
	23071816: ISheetData_Activity_SnsActivity;
	23071901: ISheetData_Activity_SnsActivity;
	23071902: ISheetData_Activity_SnsActivity;
	23071903: ISheetData_Activity_SnsActivity;
	23071904: ISheetData_Activity_SnsActivity;
	23071905: ISheetData_Activity_SnsActivity;
	23071906: ISheetData_Activity_SnsActivity;
	23071907: ISheetData_Activity_SnsActivity;
	23072001: ISheetData_Activity_SnsActivity;
	23072002: ISheetData_Activity_SnsActivity;
	23072003: ISheetData_Activity_SnsActivity;
	23072004: ISheetData_Activity_SnsActivity;
	23072005: ISheetData_Activity_SnsActivity;
	23072006: ISheetData_Activity_SnsActivity;
	23072007: ISheetData_Activity_SnsActivity;
	23072008: ISheetData_Activity_SnsActivity;
	23072009: ISheetData_Activity_SnsActivity;
	23072010: ISheetData_Activity_SnsActivity;
	23072011: ISheetData_Activity_SnsActivity;
	23072012: ISheetData_Activity_SnsActivity;
	23072013: ISheetData_Activity_SnsActivity;
	23072014: ISheetData_Activity_SnsActivity;
	23100101: ISheetData_Activity_SnsActivity;
	23100102: ISheetData_Activity_SnsActivity;
	23100103: ISheetData_Activity_SnsActivity;
	23100104: ISheetData_Activity_SnsActivity;
	23100105: ISheetData_Activity_SnsActivity;
	23100106: ISheetData_Activity_SnsActivity;
	23100107: ISheetData_Activity_SnsActivity;
	23100108: ISheetData_Activity_SnsActivity;
	23100109: ISheetData_Activity_SnsActivity;
	23100110: ISheetData_Activity_SnsActivity;
	23100111: ISheetData_Activity_SnsActivity;
	23100112: ISheetData_Activity_SnsActivity;
	23100113: ISheetData_Activity_SnsActivity;
	23100114: ISheetData_Activity_SnsActivity;
	23100115: ISheetData_Activity_SnsActivity;
	23100116: ISheetData_Activity_SnsActivity;
	23100117: ISheetData_Activity_SnsActivity;
	23100118: ISheetData_Activity_SnsActivity;
	23100119: ISheetData_Activity_SnsActivity;
	23100120: ISheetData_Activity_SnsActivity;
	23100121: ISheetData_Activity_SnsActivity;
	23100201: ISheetData_Activity_SnsActivity;
	23100202: ISheetData_Activity_SnsActivity;
	23100203: ISheetData_Activity_SnsActivity;
	23100204: ISheetData_Activity_SnsActivity;
	23100205: ISheetData_Activity_SnsActivity;
	23100206: ISheetData_Activity_SnsActivity;
	23100207: ISheetData_Activity_SnsActivity;
	23100208: ISheetData_Activity_SnsActivity;
	23100209: ISheetData_Activity_SnsActivity;
	23100210: ISheetData_Activity_SnsActivity;
	23100211: ISheetData_Activity_SnsActivity;
	23100212: ISheetData_Activity_SnsActivity;
	23100213: ISheetData_Activity_SnsActivity;
	23100214: ISheetData_Activity_SnsActivity;
	23100215: ISheetData_Activity_SnsActivity;
	23100216: ISheetData_Activity_SnsActivity;
	23100217: ISheetData_Activity_SnsActivity;
	23100218: ISheetData_Activity_SnsActivity;
	23100219: ISheetData_Activity_SnsActivity;
	23100220: ISheetData_Activity_SnsActivity;
	23100221: ISheetData_Activity_SnsActivity;
	23100301: ISheetData_Activity_SnsActivity;
	23100302: ISheetData_Activity_SnsActivity;
	23100303: ISheetData_Activity_SnsActivity;
	23100304: ISheetData_Activity_SnsActivity;
	23100305: ISheetData_Activity_SnsActivity;
	23100306: ISheetData_Activity_SnsActivity;
	23100307: ISheetData_Activity_SnsActivity;
	23100308: ISheetData_Activity_SnsActivity;
	23100309: ISheetData_Activity_SnsActivity;
	23100310: ISheetData_Activity_SnsActivity;
	23100311: ISheetData_Activity_SnsActivity;
	23100312: ISheetData_Activity_SnsActivity;
	23100313: ISheetData_Activity_SnsActivity;
	23100314: ISheetData_Activity_SnsActivity;
	23100315: ISheetData_Activity_SnsActivity;
	23100316: ISheetData_Activity_SnsActivity;
	23100317: ISheetData_Activity_SnsActivity;
	23100318: ISheetData_Activity_SnsActivity;
	23100319: ISheetData_Activity_SnsActivity;
	23100320: ISheetData_Activity_SnsActivity;
	23100401: ISheetData_Activity_SnsActivity;
	23100402: ISheetData_Activity_SnsActivity;
	23100403: ISheetData_Activity_SnsActivity;
	23100404: ISheetData_Activity_SnsActivity;
	23100405: ISheetData_Activity_SnsActivity;
	23100406: ISheetData_Activity_SnsActivity;
	23100407: ISheetData_Activity_SnsActivity;
	23100408: ISheetData_Activity_SnsActivity;
	23100409: ISheetData_Activity_SnsActivity;
	23100410: ISheetData_Activity_SnsActivity;
	23100411: ISheetData_Activity_SnsActivity;
	23100412: ISheetData_Activity_SnsActivity;
	23100413: ISheetData_Activity_SnsActivity;
	23100414: ISheetData_Activity_SnsActivity;
	23100415: ISheetData_Activity_SnsActivity;
	23100501: ISheetData_Activity_SnsActivity;
	23100502: ISheetData_Activity_SnsActivity;
	23100503: ISheetData_Activity_SnsActivity;
	23100504: ISheetData_Activity_SnsActivity;
	23100505: ISheetData_Activity_SnsActivity;
	23100506: ISheetData_Activity_SnsActivity;
	23100507: ISheetData_Activity_SnsActivity;
	23100508: ISheetData_Activity_SnsActivity;
	23100509: ISheetData_Activity_SnsActivity;
	23100510: ISheetData_Activity_SnsActivity;
	23100511: ISheetData_Activity_SnsActivity;
	23100512: ISheetData_Activity_SnsActivity;
	23100513: ISheetData_Activity_SnsActivity;
	23100514: ISheetData_Activity_SnsActivity;
	23100601: ISheetData_Activity_SnsActivity;
	23100602: ISheetData_Activity_SnsActivity;
	23100603: ISheetData_Activity_SnsActivity;
	23100604: ISheetData_Activity_SnsActivity;
	23100605: ISheetData_Activity_SnsActivity;
	23100606: ISheetData_Activity_SnsActivity;
	23100607: ISheetData_Activity_SnsActivity;
	23100608: ISheetData_Activity_SnsActivity;
	23100609: ISheetData_Activity_SnsActivity;
	23100610: ISheetData_Activity_SnsActivity;
	23100611: ISheetData_Activity_SnsActivity;
	23100612: ISheetData_Activity_SnsActivity;
	23100613: ISheetData_Activity_SnsActivity;
	23100614: ISheetData_Activity_SnsActivity;
	23100615: ISheetData_Activity_SnsActivity;
	23100616: ISheetData_Activity_SnsActivity;
	23100617: ISheetData_Activity_SnsActivity;
	23100618: ISheetData_Activity_SnsActivity;
	23100619: ISheetData_Activity_SnsActivity;
	23100620: ISheetData_Activity_SnsActivity;
	23100621: ISheetData_Activity_SnsActivity;
	23100622: ISheetData_Activity_SnsActivity;
	23100623: ISheetData_Activity_SnsActivity;
	23100624: ISheetData_Activity_SnsActivity;
	23100625: ISheetData_Activity_SnsActivity;
	23100701: ISheetData_Activity_SnsActivity;
	23100702: ISheetData_Activity_SnsActivity;
	23100703: ISheetData_Activity_SnsActivity;
	23100704: ISheetData_Activity_SnsActivity;
	23100705: ISheetData_Activity_SnsActivity;
	23100706: ISheetData_Activity_SnsActivity;
	23100707: ISheetData_Activity_SnsActivity;
	23100708: ISheetData_Activity_SnsActivity;
	23100709: ISheetData_Activity_SnsActivity;
	23100710: ISheetData_Activity_SnsActivity;
	23100711: ISheetData_Activity_SnsActivity;
	23100712: ISheetData_Activity_SnsActivity;
	23100713: ISheetData_Activity_SnsActivity;
	23100714: ISheetData_Activity_SnsActivity;
	23100801: ISheetData_Activity_SnsActivity;
	23100802: ISheetData_Activity_SnsActivity;
	23100803: ISheetData_Activity_SnsActivity;
	23100804: ISheetData_Activity_SnsActivity;
	23100805: ISheetData_Activity_SnsActivity;
	23100806: ISheetData_Activity_SnsActivity;
	23100807: ISheetData_Activity_SnsActivity;
	23100808: ISheetData_Activity_SnsActivity;
	23100809: ISheetData_Activity_SnsActivity;
	23100810: ISheetData_Activity_SnsActivity;
	23100901: ISheetData_Activity_SnsActivity;
	23100902: ISheetData_Activity_SnsActivity;
	23100903: ISheetData_Activity_SnsActivity;
	23100904: ISheetData_Activity_SnsActivity;
	23100905: ISheetData_Activity_SnsActivity;
	23100906: ISheetData_Activity_SnsActivity;
	23100907: ISheetData_Activity_SnsActivity;
	23100908: ISheetData_Activity_SnsActivity;
	23100909: ISheetData_Activity_SnsActivity;
	23100910: ISheetData_Activity_SnsActivity;
	23101001: ISheetData_Activity_SnsActivity;
	23101002: ISheetData_Activity_SnsActivity;
	23101003: ISheetData_Activity_SnsActivity;
	23101004: ISheetData_Activity_SnsActivity;
	23101005: ISheetData_Activity_SnsActivity;
	23101006: ISheetData_Activity_SnsActivity;
	23101007: ISheetData_Activity_SnsActivity;
	23101008: ISheetData_Activity_SnsActivity;
	23101009: ISheetData_Activity_SnsActivity;
	23101010: ISheetData_Activity_SnsActivity;
	23101011: ISheetData_Activity_SnsActivity;
	23101101: ISheetData_Activity_SnsActivity;
	23101102: ISheetData_Activity_SnsActivity;
	23101103: ISheetData_Activity_SnsActivity;
	23101104: ISheetData_Activity_SnsActivity;
	23101105: ISheetData_Activity_SnsActivity;
	23101106: ISheetData_Activity_SnsActivity;
	23101107: ISheetData_Activity_SnsActivity;
	23101108: ISheetData_Activity_SnsActivity;
	23101109: ISheetData_Activity_SnsActivity;
	23101110: ISheetData_Activity_SnsActivity;
	23101111: ISheetData_Activity_SnsActivity;
	23101112: ISheetData_Activity_SnsActivity;
	23101113: ISheetData_Activity_SnsActivity;
	23101114: ISheetData_Activity_SnsActivity;
	23101115: ISheetData_Activity_SnsActivity;
	23101201: ISheetData_Activity_SnsActivity;
	23101202: ISheetData_Activity_SnsActivity;
	23101203: ISheetData_Activity_SnsActivity;
	23101204: ISheetData_Activity_SnsActivity;
	23101205: ISheetData_Activity_SnsActivity;
	23101206: ISheetData_Activity_SnsActivity;
	23101207: ISheetData_Activity_SnsActivity;
	23101208: ISheetData_Activity_SnsActivity;
	23101209: ISheetData_Activity_SnsActivity;
	23101210: ISheetData_Activity_SnsActivity;
	23101301: ISheetData_Activity_SnsActivity;
	23101302: ISheetData_Activity_SnsActivity;
	23101303: ISheetData_Activity_SnsActivity;
	23101304: ISheetData_Activity_SnsActivity;
	23101305: ISheetData_Activity_SnsActivity;
	23101306: ISheetData_Activity_SnsActivity;
	23101307: ISheetData_Activity_SnsActivity;
	23101308: ISheetData_Activity_SnsActivity;
	23101401: ISheetData_Activity_SnsActivity;
	23101402: ISheetData_Activity_SnsActivity;
	23101403: ISheetData_Activity_SnsActivity;
	23101404: ISheetData_Activity_SnsActivity;
	23101405: ISheetData_Activity_SnsActivity;
	23101406: ISheetData_Activity_SnsActivity;
	23101407: ISheetData_Activity_SnsActivity;
	23101408: ISheetData_Activity_SnsActivity;
	23101409: ISheetData_Activity_SnsActivity;
	23101410: ISheetData_Activity_SnsActivity;
	23101411: ISheetData_Activity_SnsActivity;
	23101412: ISheetData_Activity_SnsActivity;
	23101413: ISheetData_Activity_SnsActivity;
	23101414: ISheetData_Activity_SnsActivity;
	23101415: ISheetData_Activity_SnsActivity;
	23101416: ISheetData_Activity_SnsActivity;
	23101417: ISheetData_Activity_SnsActivity;
	23101501: ISheetData_Activity_SnsActivity;
	23101502: ISheetData_Activity_SnsActivity;
	23101503: ISheetData_Activity_SnsActivity;
	23101504: ISheetData_Activity_SnsActivity;
	23101505: ISheetData_Activity_SnsActivity;
	23101506: ISheetData_Activity_SnsActivity;
	23101507: ISheetData_Activity_SnsActivity;
	23101508: ISheetData_Activity_SnsActivity;
	23101509: ISheetData_Activity_SnsActivity;
	23101510: ISheetData_Activity_SnsActivity;
	23101511: ISheetData_Activity_SnsActivity;
	23101601: ISheetData_Activity_SnsActivity;
	23101602: ISheetData_Activity_SnsActivity;
	23101603: ISheetData_Activity_SnsActivity;
	23101604: ISheetData_Activity_SnsActivity;
	23101605: ISheetData_Activity_SnsActivity;
	23101606: ISheetData_Activity_SnsActivity;
	23101607: ISheetData_Activity_SnsActivity;
	23101608: ISheetData_Activity_SnsActivity;
	23101609: ISheetData_Activity_SnsActivity;
	23101610: ISheetData_Activity_SnsActivity;
	23101701: ISheetData_Activity_SnsActivity;
	23101702: ISheetData_Activity_SnsActivity;
	23101703: ISheetData_Activity_SnsActivity;
	23101704: ISheetData_Activity_SnsActivity;
	23101705: ISheetData_Activity_SnsActivity;
	23101706: ISheetData_Activity_SnsActivity;
	23101707: ISheetData_Activity_SnsActivity;
	23101708: ISheetData_Activity_SnsActivity;
	23101709: ISheetData_Activity_SnsActivity;
	23101710: ISheetData_Activity_SnsActivity;
	23101711: ISheetData_Activity_SnsActivity;
	23101801: ISheetData_Activity_SnsActivity;
	23101802: ISheetData_Activity_SnsActivity;
	23101803: ISheetData_Activity_SnsActivity;
	23101804: ISheetData_Activity_SnsActivity;
	23101805: ISheetData_Activity_SnsActivity;
	23101806: ISheetData_Activity_SnsActivity;
	23101807: ISheetData_Activity_SnsActivity;
	23101808: ISheetData_Activity_SnsActivity;
	23101809: ISheetData_Activity_SnsActivity;
	23101810: ISheetData_Activity_SnsActivity;
	23101811: ISheetData_Activity_SnsActivity;
	23101812: ISheetData_Activity_SnsActivity;
	23101901: ISheetData_Activity_SnsActivity;
	23101902: ISheetData_Activity_SnsActivity;
	23101903: ISheetData_Activity_SnsActivity;
	23101904: ISheetData_Activity_SnsActivity;
	23101905: ISheetData_Activity_SnsActivity;
	23101906: ISheetData_Activity_SnsActivity;
	23101907: ISheetData_Activity_SnsActivity;
	23101908: ISheetData_Activity_SnsActivity;
	23101909: ISheetData_Activity_SnsActivity;
	23101910: ISheetData_Activity_SnsActivity;
	23101911: ISheetData_Activity_SnsActivity;
	23102001: ISheetData_Activity_SnsActivity;
	23102002: ISheetData_Activity_SnsActivity;
	23102003: ISheetData_Activity_SnsActivity;
	23102004: ISheetData_Activity_SnsActivity;
	23102005: ISheetData_Activity_SnsActivity;
	23102006: ISheetData_Activity_SnsActivity;
	23102007: ISheetData_Activity_SnsActivity;
	23102008: ISheetData_Activity_SnsActivity;
	23102009: ISheetData_Activity_SnsActivity;
	23102010: ISheetData_Activity_SnsActivity;
	23102011: ISheetData_Activity_SnsActivity;
	23120101: ISheetData_Activity_SnsActivity;
	23120102: ISheetData_Activity_SnsActivity;
	23120103: ISheetData_Activity_SnsActivity;
	23120104: ISheetData_Activity_SnsActivity;
	23120105: ISheetData_Activity_SnsActivity;
	23120106: ISheetData_Activity_SnsActivity;
	23120107: ISheetData_Activity_SnsActivity;
	23120108: ISheetData_Activity_SnsActivity;
	23120109: ISheetData_Activity_SnsActivity;
	23120110: ISheetData_Activity_SnsActivity;
	23120111: ISheetData_Activity_SnsActivity;
	23120201: ISheetData_Activity_SnsActivity;
	23120202: ISheetData_Activity_SnsActivity;
	23120203: ISheetData_Activity_SnsActivity;
	23120204: ISheetData_Activity_SnsActivity;
	23120205: ISheetData_Activity_SnsActivity;
	23120206: ISheetData_Activity_SnsActivity;
	23120207: ISheetData_Activity_SnsActivity;
	23120208: ISheetData_Activity_SnsActivity;
	23120209: ISheetData_Activity_SnsActivity;
	23120301: ISheetData_Activity_SnsActivity;
	23120302: ISheetData_Activity_SnsActivity;
	23120303: ISheetData_Activity_SnsActivity;
	23120304: ISheetData_Activity_SnsActivity;
	23120305: ISheetData_Activity_SnsActivity;
	23120306: ISheetData_Activity_SnsActivity;
	23120307: ISheetData_Activity_SnsActivity;
	23120308: ISheetData_Activity_SnsActivity;
	23120309: ISheetData_Activity_SnsActivity;
	23120310: ISheetData_Activity_SnsActivity;
	23120401: ISheetData_Activity_SnsActivity;
	23120402: ISheetData_Activity_SnsActivity;
	23120403: ISheetData_Activity_SnsActivity;
	23120404: ISheetData_Activity_SnsActivity;
	23120405: ISheetData_Activity_SnsActivity;
	23120406: ISheetData_Activity_SnsActivity;
	23120407: ISheetData_Activity_SnsActivity;
	23120408: ISheetData_Activity_SnsActivity;
	23120409: ISheetData_Activity_SnsActivity;
	23120410: ISheetData_Activity_SnsActivity;
	23120411: ISheetData_Activity_SnsActivity;
	23120412: ISheetData_Activity_SnsActivity;
	23120413: ISheetData_Activity_SnsActivity;
	23120414: ISheetData_Activity_SnsActivity;
	23120415: ISheetData_Activity_SnsActivity;
	23120416: ISheetData_Activity_SnsActivity;
	23120417: ISheetData_Activity_SnsActivity;
	23120501: ISheetData_Activity_SnsActivity;
	23120502: ISheetData_Activity_SnsActivity;
	23120503: ISheetData_Activity_SnsActivity;
	23120504: ISheetData_Activity_SnsActivity;
	23120505: ISheetData_Activity_SnsActivity;
	23120506: ISheetData_Activity_SnsActivity;
	23120507: ISheetData_Activity_SnsActivity;
	23120508: ISheetData_Activity_SnsActivity;
	23120509: ISheetData_Activity_SnsActivity;
	23120510: ISheetData_Activity_SnsActivity;
	23120601: ISheetData_Activity_SnsActivity;
	23120602: ISheetData_Activity_SnsActivity;
	23120603: ISheetData_Activity_SnsActivity;
	23120604: ISheetData_Activity_SnsActivity;
	23120605: ISheetData_Activity_SnsActivity;
	23120606: ISheetData_Activity_SnsActivity;
	23120607: ISheetData_Activity_SnsActivity;
	23120608: ISheetData_Activity_SnsActivity;
	23120609: ISheetData_Activity_SnsActivity;
	23120610: ISheetData_Activity_SnsActivity;
	23120611: ISheetData_Activity_SnsActivity;
	23120701: ISheetData_Activity_SnsActivity;
	23120702: ISheetData_Activity_SnsActivity;
	23120703: ISheetData_Activity_SnsActivity;
	23120704: ISheetData_Activity_SnsActivity;
	23120705: ISheetData_Activity_SnsActivity;
	23120706: ISheetData_Activity_SnsActivity;
	23120707: ISheetData_Activity_SnsActivity;
	23120708: ISheetData_Activity_SnsActivity;
	23120709: ISheetData_Activity_SnsActivity;
	23120710: ISheetData_Activity_SnsActivity;
	23120711: ISheetData_Activity_SnsActivity;
	23120712: ISheetData_Activity_SnsActivity;
	23120713: ISheetData_Activity_SnsActivity;
	23120801: ISheetData_Activity_SnsActivity;
	23120802: ISheetData_Activity_SnsActivity;
	23120803: ISheetData_Activity_SnsActivity;
	23120804: ISheetData_Activity_SnsActivity;
	23120805: ISheetData_Activity_SnsActivity;
	23120806: ISheetData_Activity_SnsActivity;
	23120807: ISheetData_Activity_SnsActivity;
	23120808: ISheetData_Activity_SnsActivity;
	23120809: ISheetData_Activity_SnsActivity;
	23120810: ISheetData_Activity_SnsActivity;
	23120811: ISheetData_Activity_SnsActivity;
	23120812: ISheetData_Activity_SnsActivity;
	23120813: ISheetData_Activity_SnsActivity;
	23120814: ISheetData_Activity_SnsActivity;
	23120815: ISheetData_Activity_SnsActivity;
	23120816: ISheetData_Activity_SnsActivity;
	23120901: ISheetData_Activity_SnsActivity;
	23120902: ISheetData_Activity_SnsActivity;
	23120903: ISheetData_Activity_SnsActivity;
	23120904: ISheetData_Activity_SnsActivity;
	23120905: ISheetData_Activity_SnsActivity;
	23120906: ISheetData_Activity_SnsActivity;
	23120907: ISheetData_Activity_SnsActivity;
	23120908: ISheetData_Activity_SnsActivity;
	23120909: ISheetData_Activity_SnsActivity;
	23121001: ISheetData_Activity_SnsActivity;
	23121002: ISheetData_Activity_SnsActivity;
	23121003: ISheetData_Activity_SnsActivity;
	23121004: ISheetData_Activity_SnsActivity;
	23121005: ISheetData_Activity_SnsActivity;
	23121006: ISheetData_Activity_SnsActivity;
	23121007: ISheetData_Activity_SnsActivity;
	23121008: ISheetData_Activity_SnsActivity;
	23121009: ISheetData_Activity_SnsActivity;
	23121010: ISheetData_Activity_SnsActivity;
	23121101: ISheetData_Activity_SnsActivity;
	23121102: ISheetData_Activity_SnsActivity;
	23121103: ISheetData_Activity_SnsActivity;
	23121104: ISheetData_Activity_SnsActivity;
	23121105: ISheetData_Activity_SnsActivity;
	23121106: ISheetData_Activity_SnsActivity;
	23121107: ISheetData_Activity_SnsActivity;
	23121108: ISheetData_Activity_SnsActivity;
	23121109: ISheetData_Activity_SnsActivity;
	23121110: ISheetData_Activity_SnsActivity;
	23121111: ISheetData_Activity_SnsActivity;
	23121112: ISheetData_Activity_SnsActivity;
	23121113: ISheetData_Activity_SnsActivity;
	23121114: ISheetData_Activity_SnsActivity;
	23121201: ISheetData_Activity_SnsActivity;
	23121202: ISheetData_Activity_SnsActivity;
	23121203: ISheetData_Activity_SnsActivity;
	23121204: ISheetData_Activity_SnsActivity;
	23121205: ISheetData_Activity_SnsActivity;
	23121206: ISheetData_Activity_SnsActivity;
	23121207: ISheetData_Activity_SnsActivity;
	23121208: ISheetData_Activity_SnsActivity;
	23121209: ISheetData_Activity_SnsActivity;
	23121210: ISheetData_Activity_SnsActivity;
	23121211: ISheetData_Activity_SnsActivity;
	23121212: ISheetData_Activity_SnsActivity;
	23121301: ISheetData_Activity_SnsActivity;
	23121302: ISheetData_Activity_SnsActivity;
	23121303: ISheetData_Activity_SnsActivity;
	23121304: ISheetData_Activity_SnsActivity;
	23121305: ISheetData_Activity_SnsActivity;
	23121306: ISheetData_Activity_SnsActivity;
	23121307: ISheetData_Activity_SnsActivity;
	23121308: ISheetData_Activity_SnsActivity;
	23121309: ISheetData_Activity_SnsActivity;
	23121310: ISheetData_Activity_SnsActivity;
	23121401: ISheetData_Activity_SnsActivity;
	23121402: ISheetData_Activity_SnsActivity;
	23121403: ISheetData_Activity_SnsActivity;
	23121404: ISheetData_Activity_SnsActivity;
	23121405: ISheetData_Activity_SnsActivity;
	23121406: ISheetData_Activity_SnsActivity;
	23121407: ISheetData_Activity_SnsActivity;
	23121408: ISheetData_Activity_SnsActivity;
	23121409: ISheetData_Activity_SnsActivity;
	23121410: ISheetData_Activity_SnsActivity;
	23121411: ISheetData_Activity_SnsActivity;
	23121412: ISheetData_Activity_SnsActivity;
	23121501: ISheetData_Activity_SnsActivity;
	23121502: ISheetData_Activity_SnsActivity;
	23121503: ISheetData_Activity_SnsActivity;
	23121504: ISheetData_Activity_SnsActivity;
	23121505: ISheetData_Activity_SnsActivity;
	23121506: ISheetData_Activity_SnsActivity;
	23121507: ISheetData_Activity_SnsActivity;
	23121508: ISheetData_Activity_SnsActivity;
	23121509: ISheetData_Activity_SnsActivity;
	23121510: ISheetData_Activity_SnsActivity;
	23121601: ISheetData_Activity_SnsActivity;
	23121602: ISheetData_Activity_SnsActivity;
	23121603: ISheetData_Activity_SnsActivity;
	23121604: ISheetData_Activity_SnsActivity;
	23121605: ISheetData_Activity_SnsActivity;
	23121606: ISheetData_Activity_SnsActivity;
	23121607: ISheetData_Activity_SnsActivity;
	23121608: ISheetData_Activity_SnsActivity;
	23121609: ISheetData_Activity_SnsActivity;
	23121610: ISheetData_Activity_SnsActivity;
	23121611: ISheetData_Activity_SnsActivity;
	23121612: ISheetData_Activity_SnsActivity;
	23121613: ISheetData_Activity_SnsActivity;
	23121614: ISheetData_Activity_SnsActivity;
	23121615: ISheetData_Activity_SnsActivity;
	23121616: ISheetData_Activity_SnsActivity;
	23121617: ISheetData_Activity_SnsActivity;
	23121618: ISheetData_Activity_SnsActivity;
	23121619: ISheetData_Activity_SnsActivity;
	23121620: ISheetData_Activity_SnsActivity;
	23121621: ISheetData_Activity_SnsActivity;
	23121622: ISheetData_Activity_SnsActivity;
	23121623: ISheetData_Activity_SnsActivity;
	23121624: ISheetData_Activity_SnsActivity;
	23121625: ISheetData_Activity_SnsActivity;
	23121701: ISheetData_Activity_SnsActivity;
	23121702: ISheetData_Activity_SnsActivity;
	23121703: ISheetData_Activity_SnsActivity;
	23121704: ISheetData_Activity_SnsActivity;
	23121705: ISheetData_Activity_SnsActivity;
	23121706: ISheetData_Activity_SnsActivity;
	23121707: ISheetData_Activity_SnsActivity;
	23121708: ISheetData_Activity_SnsActivity;
	23121709: ISheetData_Activity_SnsActivity;
	23121710: ISheetData_Activity_SnsActivity;
	23121711: ISheetData_Activity_SnsActivity;
	23121712: ISheetData_Activity_SnsActivity;
	23121801: ISheetData_Activity_SnsActivity;
	23121802: ISheetData_Activity_SnsActivity;
	23121803: ISheetData_Activity_SnsActivity;
	23121804: ISheetData_Activity_SnsActivity;
	23121805: ISheetData_Activity_SnsActivity;
	23121806: ISheetData_Activity_SnsActivity;
	23121807: ISheetData_Activity_SnsActivity;
	23121808: ISheetData_Activity_SnsActivity;
	23121809: ISheetData_Activity_SnsActivity;
	23121810: ISheetData_Activity_SnsActivity;
	23121811: ISheetData_Activity_SnsActivity;
	23121901: ISheetData_Activity_SnsActivity;
	23121902: ISheetData_Activity_SnsActivity;
	23121903: ISheetData_Activity_SnsActivity;
	23121904: ISheetData_Activity_SnsActivity;
	23121905: ISheetData_Activity_SnsActivity;
	23121906: ISheetData_Activity_SnsActivity;
	23121907: ISheetData_Activity_SnsActivity;
	23121908: ISheetData_Activity_SnsActivity;
	23121909: ISheetData_Activity_SnsActivity;
	23121910: ISheetData_Activity_SnsActivity;
	23122001: ISheetData_Activity_SnsActivity;
	23122002: ISheetData_Activity_SnsActivity;
	23122003: ISheetData_Activity_SnsActivity;
	23122004: ISheetData_Activity_SnsActivity;
	23122005: ISheetData_Activity_SnsActivity;
	23122006: ISheetData_Activity_SnsActivity;
	23122007: ISheetData_Activity_SnsActivity;
	23122008: ISheetData_Activity_SnsActivity;
	23122009: ISheetData_Activity_SnsActivity;
	23122010: ISheetData_Activity_SnsActivity;
	23122011: ISheetData_Activity_SnsActivity;
	23122012: ISheetData_Activity_SnsActivity;
	23122013: ISheetData_Activity_SnsActivity;
	23122014: ISheetData_Activity_SnsActivity;
	23122101: ISheetData_Activity_SnsActivity;
	23122102: ISheetData_Activity_SnsActivity;
	23122103: ISheetData_Activity_SnsActivity;
	23122104: ISheetData_Activity_SnsActivity;
	23122105: ISheetData_Activity_SnsActivity;
	23122106: ISheetData_Activity_SnsActivity;
	23122107: ISheetData_Activity_SnsActivity;
	23122108: ISheetData_Activity_SnsActivity;
	23122109: ISheetData_Activity_SnsActivity;
	23122110: ISheetData_Activity_SnsActivity;
	23122111: ISheetData_Activity_SnsActivity;
	23122112: ISheetData_Activity_SnsActivity;
	23122113: ISheetData_Activity_SnsActivity;
	23122114: ISheetData_Activity_SnsActivity;
	23122115: ISheetData_Activity_SnsActivity;
	23122116: ISheetData_Activity_SnsActivity;
	23122201: ISheetData_Activity_SnsActivity;
	23122202: ISheetData_Activity_SnsActivity;
	23122203: ISheetData_Activity_SnsActivity;
	23122204: ISheetData_Activity_SnsActivity;
	23122205: ISheetData_Activity_SnsActivity;
	23122206: ISheetData_Activity_SnsActivity;
	23122207: ISheetData_Activity_SnsActivity;
	23122208: ISheetData_Activity_SnsActivity;
	23122209: ISheetData_Activity_SnsActivity;
	23122210: ISheetData_Activity_SnsActivity;
	23122211: ISheetData_Activity_SnsActivity;
	23122212: ISheetData_Activity_SnsActivity;
	23122213: ISheetData_Activity_SnsActivity;
	23122214: ISheetData_Activity_SnsActivity;
	23122215: ISheetData_Activity_SnsActivity;
	23122216: ISheetData_Activity_SnsActivity;
	23122301: ISheetData_Activity_SnsActivity;
	23122302: ISheetData_Activity_SnsActivity;
	23122303: ISheetData_Activity_SnsActivity;
	23122304: ISheetData_Activity_SnsActivity;
	23122305: ISheetData_Activity_SnsActivity;
	23122306: ISheetData_Activity_SnsActivity;
	23122307: ISheetData_Activity_SnsActivity;
	23122308: ISheetData_Activity_SnsActivity;
	23122309: ISheetData_Activity_SnsActivity;
	23122310: ISheetData_Activity_SnsActivity;
	23122311: ISheetData_Activity_SnsActivity;
	23122401: ISheetData_Activity_SnsActivity;
	23122402: ISheetData_Activity_SnsActivity;
	23122403: ISheetData_Activity_SnsActivity;
	23122404: ISheetData_Activity_SnsActivity;
	23122405: ISheetData_Activity_SnsActivity;
	23122406: ISheetData_Activity_SnsActivity;
	23122407: ISheetData_Activity_SnsActivity;
	23122408: ISheetData_Activity_SnsActivity;
	23122409: ISheetData_Activity_SnsActivity;
	23122410: ISheetData_Activity_SnsActivity;
	23122411: ISheetData_Activity_SnsActivity;
	23122501: ISheetData_Activity_SnsActivity;
	23122502: ISheetData_Activity_SnsActivity;
	23122503: ISheetData_Activity_SnsActivity;
	23122504: ISheetData_Activity_SnsActivity;
	23122505: ISheetData_Activity_SnsActivity;
	23122506: ISheetData_Activity_SnsActivity;
	23122507: ISheetData_Activity_SnsActivity;
	23122508: ISheetData_Activity_SnsActivity;
	23122509: ISheetData_Activity_SnsActivity;
	23122510: ISheetData_Activity_SnsActivity;
	24060101: ISheetData_Activity_SnsActivity;
	24060102: ISheetData_Activity_SnsActivity;
	24060103: ISheetData_Activity_SnsActivity;
	24060104: ISheetData_Activity_SnsActivity;
	24060105: ISheetData_Activity_SnsActivity;
	24060106: ISheetData_Activity_SnsActivity;
	24060107: ISheetData_Activity_SnsActivity;
	24060108: ISheetData_Activity_SnsActivity;
	24060109: ISheetData_Activity_SnsActivity;
	24060110: ISheetData_Activity_SnsActivity;
	24060111: ISheetData_Activity_SnsActivity;
	24060112: ISheetData_Activity_SnsActivity;
	24060113: ISheetData_Activity_SnsActivity;
	24060114: ISheetData_Activity_SnsActivity;
	24060115: ISheetData_Activity_SnsActivity;
	24060116: ISheetData_Activity_SnsActivity;
	24060117: ISheetData_Activity_SnsActivity;
	24060118: ISheetData_Activity_SnsActivity;
	24060119: ISheetData_Activity_SnsActivity;
	24060120: ISheetData_Activity_SnsActivity;
	24060121: ISheetData_Activity_SnsActivity;
	24060122: ISheetData_Activity_SnsActivity;
	24060123: ISheetData_Activity_SnsActivity;
	24060124: ISheetData_Activity_SnsActivity;
	24060201: ISheetData_Activity_SnsActivity;
	24060202: ISheetData_Activity_SnsActivity;
	24060203: ISheetData_Activity_SnsActivity;
	24060204: ISheetData_Activity_SnsActivity;
	24060205: ISheetData_Activity_SnsActivity;
	24060206: ISheetData_Activity_SnsActivity;
	24060207: ISheetData_Activity_SnsActivity;
	24060208: ISheetData_Activity_SnsActivity;
	24060209: ISheetData_Activity_SnsActivity;
	24060210: ISheetData_Activity_SnsActivity;
	24060211: ISheetData_Activity_SnsActivity;
	24060212: ISheetData_Activity_SnsActivity;
	24060213: ISheetData_Activity_SnsActivity;
	24060214: ISheetData_Activity_SnsActivity;
	24060215: ISheetData_Activity_SnsActivity;
	24060216: ISheetData_Activity_SnsActivity;
	24060217: ISheetData_Activity_SnsActivity;
	24060218: ISheetData_Activity_SnsActivity;
	24060219: ISheetData_Activity_SnsActivity;
	24060301: ISheetData_Activity_SnsActivity;
	24060302: ISheetData_Activity_SnsActivity;
	24060303: ISheetData_Activity_SnsActivity;
	24060304: ISheetData_Activity_SnsActivity;
	24060305: ISheetData_Activity_SnsActivity;
	24060306: ISheetData_Activity_SnsActivity;
	24060307: ISheetData_Activity_SnsActivity;
	24060308: ISheetData_Activity_SnsActivity;
	24060309: ISheetData_Activity_SnsActivity;
	24060310: ISheetData_Activity_SnsActivity;
	24060401: ISheetData_Activity_SnsActivity;
	24060402: ISheetData_Activity_SnsActivity;
	24060403: ISheetData_Activity_SnsActivity;
	24060404: ISheetData_Activity_SnsActivity;
	24060405: ISheetData_Activity_SnsActivity;
	24060406: ISheetData_Activity_SnsActivity;
	24060407: ISheetData_Activity_SnsActivity;
	24060408: ISheetData_Activity_SnsActivity;
	24060409: ISheetData_Activity_SnsActivity;
	24060410: ISheetData_Activity_SnsActivity;
	24060411: ISheetData_Activity_SnsActivity;
	24060412: ISheetData_Activity_SnsActivity;
	24060413: ISheetData_Activity_SnsActivity;
	24060414: ISheetData_Activity_SnsActivity;
	24060415: ISheetData_Activity_SnsActivity;
	24060501: ISheetData_Activity_SnsActivity;
	24060502: ISheetData_Activity_SnsActivity;
	24060503: ISheetData_Activity_SnsActivity;
	24060504: ISheetData_Activity_SnsActivity;
	24060505: ISheetData_Activity_SnsActivity;
	24060506: ISheetData_Activity_SnsActivity;
	24060507: ISheetData_Activity_SnsActivity;
	24060601: ISheetData_Activity_SnsActivity;
	24060602: ISheetData_Activity_SnsActivity;
	24060603: ISheetData_Activity_SnsActivity;
	24060604: ISheetData_Activity_SnsActivity;
	24060605: ISheetData_Activity_SnsActivity;
	24060606: ISheetData_Activity_SnsActivity;
	24060607: ISheetData_Activity_SnsActivity;
	24060608: ISheetData_Activity_SnsActivity;
	24060609: ISheetData_Activity_SnsActivity;
	24060610: ISheetData_Activity_SnsActivity;
	24060611: ISheetData_Activity_SnsActivity;
	24060701: ISheetData_Activity_SnsActivity;
	24060702: ISheetData_Activity_SnsActivity;
	24060703: ISheetData_Activity_SnsActivity;
	24060704: ISheetData_Activity_SnsActivity;
	24060705: ISheetData_Activity_SnsActivity;
	24060706: ISheetData_Activity_SnsActivity;
	24060707: ISheetData_Activity_SnsActivity;
	24060708: ISheetData_Activity_SnsActivity;
	24060801: ISheetData_Activity_SnsActivity;
	24060802: ISheetData_Activity_SnsActivity;
	24060803: ISheetData_Activity_SnsActivity;
	24060804: ISheetData_Activity_SnsActivity;
	24060805: ISheetData_Activity_SnsActivity;
	24060806: ISheetData_Activity_SnsActivity;
	24060807: ISheetData_Activity_SnsActivity;
	24060901: ISheetData_Activity_SnsActivity;
	24060902: ISheetData_Activity_SnsActivity;
	24060903: ISheetData_Activity_SnsActivity;
	24060904: ISheetData_Activity_SnsActivity;
	24060905: ISheetData_Activity_SnsActivity;
	24060906: ISheetData_Activity_SnsActivity;
	24060907: ISheetData_Activity_SnsActivity;
	24060908: ISheetData_Activity_SnsActivity;
	24061001: ISheetData_Activity_SnsActivity;
	24061002: ISheetData_Activity_SnsActivity;
	24061003: ISheetData_Activity_SnsActivity;
	24061004: ISheetData_Activity_SnsActivity;
	24061005: ISheetData_Activity_SnsActivity;
	24061006: ISheetData_Activity_SnsActivity;
	24061007: ISheetData_Activity_SnsActivity;
	24061008: ISheetData_Activity_SnsActivity;
	24061009: ISheetData_Activity_SnsActivity;
	24061010: ISheetData_Activity_SnsActivity;
	24061011: ISheetData_Activity_SnsActivity;
	24061012: ISheetData_Activity_SnsActivity;
	24061101: ISheetData_Activity_SnsActivity;
	24061102: ISheetData_Activity_SnsActivity;
	24061103: ISheetData_Activity_SnsActivity;
	24061104: ISheetData_Activity_SnsActivity;
	24061105: ISheetData_Activity_SnsActivity;
	24061106: ISheetData_Activity_SnsActivity;
	24061107: ISheetData_Activity_SnsActivity;
	24061108: ISheetData_Activity_SnsActivity;
	24061109: ISheetData_Activity_SnsActivity;
	24061201: ISheetData_Activity_SnsActivity;
	24061202: ISheetData_Activity_SnsActivity;
	24061203: ISheetData_Activity_SnsActivity;
	24061204: ISheetData_Activity_SnsActivity;
	24061205: ISheetData_Activity_SnsActivity;
	24061206: ISheetData_Activity_SnsActivity;
	24061207: ISheetData_Activity_SnsActivity;
	24061208: ISheetData_Activity_SnsActivity;
	24061209: ISheetData_Activity_SnsActivity;
	24061210: ISheetData_Activity_SnsActivity;
	24061211: ISheetData_Activity_SnsActivity;
	24061212: ISheetData_Activity_SnsActivity;
	24061301: ISheetData_Activity_SnsActivity;
	24061302: ISheetData_Activity_SnsActivity;
	24061303: ISheetData_Activity_SnsActivity;
	24061304: ISheetData_Activity_SnsActivity;
	24061305: ISheetData_Activity_SnsActivity;
	24061306: ISheetData_Activity_SnsActivity;
	24061307: ISheetData_Activity_SnsActivity;
	24061308: ISheetData_Activity_SnsActivity;
	24061309: ISheetData_Activity_SnsActivity;
	24061310: ISheetData_Activity_SnsActivity;
	24061311: ISheetData_Activity_SnsActivity;
	24061312: ISheetData_Activity_SnsActivity;
	24061401: ISheetData_Activity_SnsActivity;
	24061402: ISheetData_Activity_SnsActivity;
	24061403: ISheetData_Activity_SnsActivity;
	24061404: ISheetData_Activity_SnsActivity;
	24061405: ISheetData_Activity_SnsActivity;
	24061406: ISheetData_Activity_SnsActivity;
	24061407: ISheetData_Activity_SnsActivity;
	24061408: ISheetData_Activity_SnsActivity;
	24061409: ISheetData_Activity_SnsActivity;
	24061501: ISheetData_Activity_SnsActivity;
	24061502: ISheetData_Activity_SnsActivity;
	24061503: ISheetData_Activity_SnsActivity;
	24061504: ISheetData_Activity_SnsActivity;
	24061505: ISheetData_Activity_SnsActivity;
	24061506: ISheetData_Activity_SnsActivity;
	24061507: ISheetData_Activity_SnsActivity;
	24061508: ISheetData_Activity_SnsActivity;
	24061509: ISheetData_Activity_SnsActivity;
	24061601: ISheetData_Activity_SnsActivity;
	24061602: ISheetData_Activity_SnsActivity;
	24061603: ISheetData_Activity_SnsActivity;
	24061604: ISheetData_Activity_SnsActivity;
	24061605: ISheetData_Activity_SnsActivity;
	24061606: ISheetData_Activity_SnsActivity;
	24061607: ISheetData_Activity_SnsActivity;
	24061608: ISheetData_Activity_SnsActivity;
	24061609: ISheetData_Activity_SnsActivity;
	24061610: ISheetData_Activity_SnsActivity;
	24061611: ISheetData_Activity_SnsActivity;
	24061701: ISheetData_Activity_SnsActivity;
	24061702: ISheetData_Activity_SnsActivity;
	24061703: ISheetData_Activity_SnsActivity;
	24061704: ISheetData_Activity_SnsActivity;
	24061705: ISheetData_Activity_SnsActivity;
	24061706: ISheetData_Activity_SnsActivity;
	24061707: ISheetData_Activity_SnsActivity;
	24061708: ISheetData_Activity_SnsActivity;
	24061709: ISheetData_Activity_SnsActivity;
	24061710: ISheetData_Activity_SnsActivity;
	24061711: ISheetData_Activity_SnsActivity;
	24061712: ISheetData_Activity_SnsActivity;
	24061713: ISheetData_Activity_SnsActivity;
	24061714: ISheetData_Activity_SnsActivity;
	24061715: ISheetData_Activity_SnsActivity;
	24061716: ISheetData_Activity_SnsActivity;
	24061717: ISheetData_Activity_SnsActivity;
	24061801: ISheetData_Activity_SnsActivity;
	24061802: ISheetData_Activity_SnsActivity;
	24061803: ISheetData_Activity_SnsActivity;
	24061804: ISheetData_Activity_SnsActivity;
	24061805: ISheetData_Activity_SnsActivity;
	24061806: ISheetData_Activity_SnsActivity;
	24061807: ISheetData_Activity_SnsActivity;
	24061808: ISheetData_Activity_SnsActivity;
	24061809: ISheetData_Activity_SnsActivity;
	24061810: ISheetData_Activity_SnsActivity;
	24061811: ISheetData_Activity_SnsActivity;
	24061812: ISheetData_Activity_SnsActivity;
	24061813: ISheetData_Activity_SnsActivity;
	24061814: ISheetData_Activity_SnsActivity;
	24061815: ISheetData_Activity_SnsActivity;
	24061816: ISheetData_Activity_SnsActivity;
	24061901: ISheetData_Activity_SnsActivity;
	24061902: ISheetData_Activity_SnsActivity;
	24061903: ISheetData_Activity_SnsActivity;
	24061904: ISheetData_Activity_SnsActivity;
	24061905: ISheetData_Activity_SnsActivity;
	24061906: ISheetData_Activity_SnsActivity;
	24061907: ISheetData_Activity_SnsActivity;
	24061908: ISheetData_Activity_SnsActivity;
	24061909: ISheetData_Activity_SnsActivity;
	24061910: ISheetData_Activity_SnsActivity;
	24061911: ISheetData_Activity_SnsActivity;
	24062001: ISheetData_Activity_SnsActivity;
	24062002: ISheetData_Activity_SnsActivity;
	24062003: ISheetData_Activity_SnsActivity;
	24062004: ISheetData_Activity_SnsActivity;
	24062005: ISheetData_Activity_SnsActivity;
	24062006: ISheetData_Activity_SnsActivity;
	24062007: ISheetData_Activity_SnsActivity;
	24062008: ISheetData_Activity_SnsActivity;
	24062009: ISheetData_Activity_SnsActivity;
	24062010: ISheetData_Activity_SnsActivity;
	24062011: ISheetData_Activity_SnsActivity;
	24062012: ISheetData_Activity_SnsActivity;
	24062101: ISheetData_Activity_SnsActivity;
	24062102: ISheetData_Activity_SnsActivity;
	24062103: ISheetData_Activity_SnsActivity;
	24062104: ISheetData_Activity_SnsActivity;
	24062105: ISheetData_Activity_SnsActivity;
	24062106: ISheetData_Activity_SnsActivity;
	24062107: ISheetData_Activity_SnsActivity;
	24062108: ISheetData_Activity_SnsActivity;
	24062109: ISheetData_Activity_SnsActivity;
	24062110: ISheetData_Activity_SnsActivity;
	24062111: ISheetData_Activity_SnsActivity;
	24062112: ISheetData_Activity_SnsActivity;
	24062201: ISheetData_Activity_SnsActivity;
	24062202: ISheetData_Activity_SnsActivity;
	24062203: ISheetData_Activity_SnsActivity;
	24062204: ISheetData_Activity_SnsActivity;
	24062205: ISheetData_Activity_SnsActivity;
	24062206: ISheetData_Activity_SnsActivity;
	24062207: ISheetData_Activity_SnsActivity;
	24062208: ISheetData_Activity_SnsActivity;
	24062209: ISheetData_Activity_SnsActivity;
	24062210: ISheetData_Activity_SnsActivity;
	24062211: ISheetData_Activity_SnsActivity;
	24062301: ISheetData_Activity_SnsActivity;
	24062302: ISheetData_Activity_SnsActivity;
	24062303: ISheetData_Activity_SnsActivity;
	24062304: ISheetData_Activity_SnsActivity;
	24062305: ISheetData_Activity_SnsActivity;
	24062401: ISheetData_Activity_SnsActivity;
	24062402: ISheetData_Activity_SnsActivity;
	24062403: ISheetData_Activity_SnsActivity;
	24062404: ISheetData_Activity_SnsActivity;
	24062405: ISheetData_Activity_SnsActivity;
	24062406: ISheetData_Activity_SnsActivity;
	24062407: ISheetData_Activity_SnsActivity;
	24062408: ISheetData_Activity_SnsActivity;
	24062501: ISheetData_Activity_SnsActivity;
	24062502: ISheetData_Activity_SnsActivity;
	24062503: ISheetData_Activity_SnsActivity;
	24062504: ISheetData_Activity_SnsActivity;
	24062505: ISheetData_Activity_SnsActivity;
	24062506: ISheetData_Activity_SnsActivity;
	24062507: ISheetData_Activity_SnsActivity;
	24062508: ISheetData_Activity_SnsActivity;
	24062509: ISheetData_Activity_SnsActivity;
	24062510: ISheetData_Activity_SnsActivity;
	25086001: ISheetData_Activity_SnsActivity;
	25086002: ISheetData_Activity_SnsActivity;
	25086003: ISheetData_Activity_SnsActivity;
	25086004: ISheetData_Activity_SnsActivity;
	25086005: ISheetData_Activity_SnsActivity;
	25086006: ISheetData_Activity_SnsActivity;
	25086007: ISheetData_Activity_SnsActivity;
	25086008: ISheetData_Activity_SnsActivity;
	25086009: ISheetData_Activity_SnsActivity;
	25086010: ISheetData_Activity_SnsActivity;
	25086011: ISheetData_Activity_SnsActivity;
	25086012: ISheetData_Activity_SnsActivity;
	25086013: ISheetData_Activity_SnsActivity;
	25086014: ISheetData_Activity_SnsActivity;
	25086015: ISheetData_Activity_SnsActivity;
	25086016: ISheetData_Activity_SnsActivity;
	25086017: ISheetData_Activity_SnsActivity;
	25086018: ISheetData_Activity_SnsActivity;
	25086019: ISheetData_Activity_SnsActivity;
	25086020: ISheetData_Activity_SnsActivity;
	25086021: ISheetData_Activity_SnsActivity;
	25086022: ISheetData_Activity_SnsActivity;
	25086023: ISheetData_Activity_SnsActivity;
	25086024: ISheetData_Activity_SnsActivity;
	25086025: ISheetData_Activity_SnsActivity;
	25086026: ISheetData_Activity_SnsActivity;
	25086027: ISheetData_Activity_SnsActivity;
	25086028: ISheetData_Activity_SnsActivity;
	25086029: ISheetData_Activity_SnsActivity;
	25086030: ISheetData_Activity_SnsActivity;
	25086031: ISheetData_Activity_SnsActivity;
	25086032: ISheetData_Activity_SnsActivity;
	25086033: ISheetData_Activity_SnsActivity;
	25086034: ISheetData_Activity_SnsActivity;
	25086035: ISheetData_Activity_SnsActivity;
	25086036: ISheetData_Activity_SnsActivity;
	25086037: ISheetData_Activity_SnsActivity;
	25086038: ISheetData_Activity_SnsActivity;
	25086039: ISheetData_Activity_SnsActivity;
	25086040: ISheetData_Activity_SnsActivity;
	25086041: ISheetData_Activity_SnsActivity;
	25086042: ISheetData_Activity_SnsActivity;
	25086043: ISheetData_Activity_SnsActivity;
	25086044: ISheetData_Activity_SnsActivity;
	25086045: ISheetData_Activity_SnsActivity;
	25086046: ISheetData_Activity_SnsActivity;
	25086047: ISheetData_Activity_SnsActivity;
	25086048: ISheetData_Activity_SnsActivity;
	25086049: ISheetData_Activity_SnsActivity;
	25086050: ISheetData_Activity_SnsActivity;
	25086051: ISheetData_Activity_SnsActivity;
	25086052: ISheetData_Activity_SnsActivity;
	25086053: ISheetData_Activity_SnsActivity;
	25086054: ISheetData_Activity_SnsActivity;
	25086055: ISheetData_Activity_SnsActivity;
	25086056: ISheetData_Activity_SnsActivity;
	25086057: ISheetData_Activity_SnsActivity;
	25086058: ISheetData_Activity_SnsActivity;
	25086059: ISheetData_Activity_SnsActivity;
	25086060: ISheetData_Activity_SnsActivity;
	25086061: ISheetData_Activity_SnsActivity;
	25086062: ISheetData_Activity_SnsActivity;
	25086063: ISheetData_Activity_SnsActivity;
	25086064: ISheetData_Activity_SnsActivity;
	25086065: ISheetData_Activity_SnsActivity;
	25086066: ISheetData_Activity_SnsActivity;
	25086067: ISheetData_Activity_SnsActivity;
	25086068: ISheetData_Activity_SnsActivity;
	25086069: ISheetData_Activity_SnsActivity;
	25086070: ISheetData_Activity_SnsActivity;
	25086071: ISheetData_Activity_SnsActivity;
	25086072: ISheetData_Activity_SnsActivity;
	25086073: ISheetData_Activity_SnsActivity;
	25086074: ISheetData_Activity_SnsActivity;
	25086075: ISheetData_Activity_SnsActivity;
	25086076: ISheetData_Activity_SnsActivity;
	25086077: ISheetData_Activity_SnsActivity;
	25086078: ISheetData_Activity_SnsActivity;
	25086079: ISheetData_Activity_SnsActivity;
	25086080: ISheetData_Activity_SnsActivity;
	25086081: ISheetData_Activity_SnsActivity;
	25086082: ISheetData_Activity_SnsActivity;
	25086083: ISheetData_Activity_SnsActivity;
	25086084: ISheetData_Activity_SnsActivity;
	25086085: ISheetData_Activity_SnsActivity;
	25086086: ISheetData_Activity_SnsActivity;
	25086087: ISheetData_Activity_SnsActivity;
	25086088: ISheetData_Activity_SnsActivity;
	25086089: ISheetData_Activity_SnsActivity;
	25086090: ISheetData_Activity_SnsActivity;
	25086091: ISheetData_Activity_SnsActivity;
	25086092: ISheetData_Activity_SnsActivity;
	25086093: ISheetData_Activity_SnsActivity;
	25086094: ISheetData_Activity_SnsActivity;
	25086095: ISheetData_Activity_SnsActivity;
	25086096: ISheetData_Activity_SnsActivity;
	25086097: ISheetData_Activity_SnsActivity;
	25086098: ISheetData_Activity_SnsActivity;
	25086099: ISheetData_Activity_SnsActivity;
	25086100: ISheetData_Activity_SnsActivity;
	25086101: ISheetData_Activity_SnsActivity;
	25086102: ISheetData_Activity_SnsActivity;
	25086103: ISheetData_Activity_SnsActivity;
	25086104: ISheetData_Activity_SnsActivity;
	25086105: ISheetData_Activity_SnsActivity;
	25086106: ISheetData_Activity_SnsActivity;
	25086107: ISheetData_Activity_SnsActivity;
	25086108: ISheetData_Activity_SnsActivity;
	25086109: ISheetData_Activity_SnsActivity;
	25086110: ISheetData_Activity_SnsActivity;
	25086111: ISheetData_Activity_SnsActivity;
	25086112: ISheetData_Activity_SnsActivity;
	25086113: ISheetData_Activity_SnsActivity;
	25086114: ISheetData_Activity_SnsActivity;
	25086115: ISheetData_Activity_SnsActivity;
	25086116: ISheetData_Activity_SnsActivity;
	25086117: ISheetData_Activity_SnsActivity;
	25086118: ISheetData_Activity_SnsActivity;
	25086119: ISheetData_Activity_SnsActivity;
	25086120: ISheetData_Activity_SnsActivity;
	25086121: ISheetData_Activity_SnsActivity;
	25086122: ISheetData_Activity_SnsActivity;
	25086123: ISheetData_Activity_SnsActivity;
	25086124: ISheetData_Activity_SnsActivity;
	25086125: ISheetData_Activity_SnsActivity;
	25086126: ISheetData_Activity_SnsActivity;
	25086127: ISheetData_Activity_SnsActivity;
	25086128: ISheetData_Activity_SnsActivity;
	25086129: ISheetData_Activity_SnsActivity;
	25086130: ISheetData_Activity_SnsActivity;
	25086131: ISheetData_Activity_SnsActivity;
	25086132: ISheetData_Activity_SnsActivity;
	25086133: ISheetData_Activity_SnsActivity;
	25086134: ISheetData_Activity_SnsActivity;
	25086135: ISheetData_Activity_SnsActivity;
	25086136: ISheetData_Activity_SnsActivity;
	25086137: ISheetData_Activity_SnsActivity;
	25086138: ISheetData_Activity_SnsActivity;
	25086139: ISheetData_Activity_SnsActivity;
	25086140: ISheetData_Activity_SnsActivity;
	25086141: ISheetData_Activity_SnsActivity;
	25086142: ISheetData_Activity_SnsActivity;
	25086143: ISheetData_Activity_SnsActivity;
	25086144: ISheetData_Activity_SnsActivity;
	25086145: ISheetData_Activity_SnsActivity;
	25086146: ISheetData_Activity_SnsActivity;
	25086147: ISheetData_Activity_SnsActivity;
	25086148: ISheetData_Activity_SnsActivity;
	25086149: ISheetData_Activity_SnsActivity;
	25086150: ISheetData_Activity_SnsActivity;
	25086151: ISheetData_Activity_SnsActivity;
	25086152: ISheetData_Activity_SnsActivity;
	25086153: ISheetData_Activity_SnsActivity;
	25086154: ISheetData_Activity_SnsActivity;
	25086155: ISheetData_Activity_SnsActivity;
	25086156: ISheetData_Activity_SnsActivity;
	25086157: ISheetData_Activity_SnsActivity;
	25086158: ISheetData_Activity_SnsActivity;
	25086159: ISheetData_Activity_SnsActivity;
	25086160: ISheetData_Activity_SnsActivity;
	25086161: ISheetData_Activity_SnsActivity;
	25086162: ISheetData_Activity_SnsActivity;
	25086163: ISheetData_Activity_SnsActivity;
	25086164: ISheetData_Activity_SnsActivity;
	25086165: ISheetData_Activity_SnsActivity;
	25086166: ISheetData_Activity_SnsActivity;
	25086167: ISheetData_Activity_SnsActivity;
	25086168: ISheetData_Activity_SnsActivity;
	25086169: ISheetData_Activity_SnsActivity;
	25086170: ISheetData_Activity_SnsActivity;
	25086171: ISheetData_Activity_SnsActivity;
	25086172: ISheetData_Activity_SnsActivity;
	25086173: ISheetData_Activity_SnsActivity;
	25086174: ISheetData_Activity_SnsActivity;
	25086175: ISheetData_Activity_SnsActivity;
	25086176: ISheetData_Activity_SnsActivity;
	25086177: ISheetData_Activity_SnsActivity;
	25086178: ISheetData_Activity_SnsActivity;
	25086179: ISheetData_Activity_SnsActivity;
	25086180: ISheetData_Activity_SnsActivity;
	25086181: ISheetData_Activity_SnsActivity;
	25086182: ISheetData_Activity_SnsActivity;
	25086183: ISheetData_Activity_SnsActivity;
	25086184: ISheetData_Activity_SnsActivity;
	25086185: ISheetData_Activity_SnsActivity;
	25086186: ISheetData_Activity_SnsActivity;
	25086187: ISheetData_Activity_SnsActivity;
	25086188: ISheetData_Activity_SnsActivity;
	25086189: ISheetData_Activity_SnsActivity;
	25086190: ISheetData_Activity_SnsActivity;
	25086191: ISheetData_Activity_SnsActivity;
	25086192: ISheetData_Activity_SnsActivity;
	25086193: ISheetData_Activity_SnsActivity;
	25086194: ISheetData_Activity_SnsActivity;
	25086195: ISheetData_Activity_SnsActivity;
	25086196: ISheetData_Activity_SnsActivity;
	25086197: ISheetData_Activity_SnsActivity;
	25086198: ISheetData_Activity_SnsActivity;
	25086199: ISheetData_Activity_SnsActivity;
	25086200: ISheetData_Activity_SnsActivity;
	25086201: ISheetData_Activity_SnsActivity;
	25086202: ISheetData_Activity_SnsActivity;
	25086203: ISheetData_Activity_SnsActivity;
	25086204: ISheetData_Activity_SnsActivity;
	25086205: ISheetData_Activity_SnsActivity;
	25086206: ISheetData_Activity_SnsActivity;
	25086207: ISheetData_Activity_SnsActivity;
	25086208: ISheetData_Activity_SnsActivity;
	25086209: ISheetData_Activity_SnsActivity;
	25086210: ISheetData_Activity_SnsActivity;
	25086211: ISheetData_Activity_SnsActivity;
	25086212: ISheetData_Activity_SnsActivity;
	25086213: ISheetData_Activity_SnsActivity;
	25086214: ISheetData_Activity_SnsActivity;
	25086215: ISheetData_Activity_SnsActivity;
	25086216: ISheetData_Activity_SnsActivity;
	25086217: ISheetData_Activity_SnsActivity;
	25086218: ISheetData_Activity_SnsActivity;
	25086219: ISheetData_Activity_SnsActivity;
	25086220: ISheetData_Activity_SnsActivity;
	25086221: ISheetData_Activity_SnsActivity;
	25086222: ISheetData_Activity_SnsActivity;
	25086223: ISheetData_Activity_SnsActivity;
	25086224: ISheetData_Activity_SnsActivity;
	25086225: ISheetData_Activity_SnsActivity;
	25086226: ISheetData_Activity_SnsActivity;
	25086227: ISheetData_Activity_SnsActivity;
	25086228: ISheetData_Activity_SnsActivity;
	25086229: ISheetData_Activity_SnsActivity;
	25086230: ISheetData_Activity_SnsActivity;
	25086231: ISheetData_Activity_SnsActivity;
	25086232: ISheetData_Activity_SnsActivity;
	25086233: ISheetData_Activity_SnsActivity;
	25086234: ISheetData_Activity_SnsActivity;
	25086235: ISheetData_Activity_SnsActivity;
	25086236: ISheetData_Activity_SnsActivity;
	25086237: ISheetData_Activity_SnsActivity;
	25086238: ISheetData_Activity_SnsActivity;
	25086239: ISheetData_Activity_SnsActivity;
	25086240: ISheetData_Activity_SnsActivity;
	25086241: ISheetData_Activity_SnsActivity;
	25086242: ISheetData_Activity_SnsActivity;
	25086243: ISheetData_Activity_SnsActivity;
}
declare interface ISheetData_Activity_SnsActivity {
	/** snsID */
	id: number;
	disable: number;
	/** 是否私信 */
	pm: number;
	/** 对话结束标记 */
	period: number;
	/** sns活动ID */
	activity_id: number;
	/** 博客内容 */
	content_str_id: number;
	/** 父snsID */
	parent_id: number;
	/** 昵称，自定id和玩家id填0 */
	char_id: number;
	/** 指定str-event，玩家id填0 */
	char_str_id: number;
	/** 回复，玩家id填1，自定id填0 */
	reply_char_id: number;
	/** 指定str-event */
	reply_char_str_id: number;
	/** 用户选项分组 */
	choice_id: number;
	/** 点赞数 */
	like: number;
	/** 解锁时间，解锁物品是【且】关系 */
	unlock_time: string;
	/** 解锁物品ID */
	unlock_item_id: number;
	/** 解锁物品数量 */
	unlock_item_count: number;
	/** 博客图片 */
	content_image: string[];
}
//#endregion

//#region mine_activity --- unique
declare interface ISheet_Activity_MineActivity {
	rows: ISheetData_Activity_MineActivity[];
	1194: ISheetData_Activity_MineActivity;
	1301: ISheetData_Activity_MineActivity;
	221002: ISheetData_Activity_MineActivity;
	230502: ISheetData_Activity_MineActivity;
	240202: ISheetData_Activity_MineActivity;
	241002: ISheetData_Activity_MineActivity;
	250702: ISheetData_Activity_MineActivity;
}
declare interface ISheetData_Activity_MineActivity {
	/** activity_id */
	activity_id: number;
	/** 奖励组ID */
	reward_group: number;
	/** 挖矿消耗物品 */
	cost_item: string;
	/** 地图大小 */
	map_size_x: number;
	/** 地图大小 */
	map_size_y: number;
}
//#endregion

//#region mine_reward --- group
declare interface ISheet_Activity_MineReward {
	rows: ISheetData_Activity_MineReward[];
	1194: ISheetData_Activity_MineReward[];
	1301: ISheetData_Activity_MineReward[];
	221002: ISheetData_Activity_MineReward[];
	230502: ISheetData_Activity_MineReward[];
	240202: ISheetData_Activity_MineReward[];
	241002: ISheetData_Activity_MineReward[];
	250702: ISheetData_Activity_MineReward[];
}
declare interface ISheetData_Activity_MineReward {
	group_id: number;
	/** 唯一奖励id */
	reward_id: number;
	/** 奖励内容 */
	reward: string;
	/** 显示类型 */
	type: number;
	/** 宽度 */
	x: number;
	/** 高度 */
	y: number;
}
//#endregion

//#region rpg_activity --- unique
declare interface ISheet_Activity_RpgActivity {
	rows: ISheetData_Activity_RpgActivity[];
	1206: ISheetData_Activity_RpgActivity;
}
declare interface ISheetData_Activity_RpgActivity {
	activity_id: number;
	/** 玩家基础生命 */
	base_hp: number;
	/** 玩家基础攻击 */
	base_atk: number;
	/** 玩家基础回避 */
	base_dex: number;
	/** 玩家基础暴击 */
	base_luk: number;
	/** 击飞额外攻击力 */
	ds_atk: number;
	/** 无铳治疗量 */
	special_heal: number;
	/** 连续胡牌攻击倍率 */
	chain_atk: number[];
	/** 怪物组 */
	monster_group: number;
	/** 三麻敌我攻击力削弱 */
	sanma_debuff: number;
	/** 是否可以带AI */
	has_robot: number;
	/** 对局类别 */
	category: string;
	/** 匹配模式 */
	mode: string;
	/** 对局模式 */
	room: string;
	/** 每日击破上限 */
	daily_limit: number;
}
//#endregion

//#region rpg_monster_group --- group
declare interface ISheet_Activity_RpgMonsterGroup {
	rows: ISheetData_Activity_RpgMonsterGroup[];
	120601: ISheetData_Activity_RpgMonsterGroup[];
	22081101: ISheetData_Activity_RpgMonsterGroup[];
}
declare interface ISheetData_Activity_RpgMonsterGroup {
	group_id: number;
	/** 顺序 */
	seq: number;
	/** 怪类型（纯前端）0杂兵，1boss */
	type: number;
	/** 血量 */
	hp: number;
	/** 攻击力 */
	atk: number;
	/** 奖励 */
	reward: string;
	/** 前端用 */
	season: number;
	/** 前端用 */
	chapters: string;
	/** 前端用 */
	imaget_path: string;
	/** 前端用 */
	background: string;
	/** 对应str/event */
	name_str_id: number;
}
//#endregion

//#region arena_activity --- unique
declare interface ISheet_Activity_ArenaActivity {
	rows: ISheetData_Activity_ArenaActivity[];
	1245: ISheetData_Activity_ArenaActivity;
}
declare interface ISheetData_Activity_ArenaActivity {
	activity_id: number;
	/** 匹配时间控制 */
	match_time: string;
	/** 最晚购买门票时间 */
	ticket_time_limit: string;
	/** 门票物品ID */
	ticket_item_id: number;
	/** 门票购买价格 */
	ticket_price: string;
	/** 匹配桌ID */
	desktop_id: number;
	/** 最大胜场 */
	max_win_count: number;
	/** 最大败场 */
	max_lose_count: number;
	/** 奖励组ID */
	reward_group: number;
	/** 每日买入限制 */
	daily_ticket_limit: number;
	/** 奖励邮件ID */
	mail_template: number;
	arena_reward_display_group: number;
	level_limit: number;
}
//#endregion

//#region arena_reward --- group
declare interface ISheet_Activity_ArenaReward {
	rows: ISheetData_Activity_ArenaReward[];
	124501: ISheetData_Activity_ArenaReward[];
}
declare interface ISheetData_Activity_ArenaReward {
	group_id: number;
	/** 胜场数量 */
	win_count: number;
	/** 奖励 */
	reward: string;
}
//#endregion

//#region arena_reward_display --- group
declare interface ISheet_Activity_ArenaRewardDisplay {
	rows: ISheetData_Activity_ArenaRewardDisplay[];
	124501: ISheetData_Activity_ArenaRewardDisplay[];
}
declare interface ISheetData_Activity_ArenaRewardDisplay {
	group_id: number;
	win_count_min: number;
	win_count_max: number;
	/** 奖励 */
	reward_1: number;
	/** 备注数量 */
	reward_1_remark: string;
	/** 奖励 */
	reward_2: number;
	/** 备注数量 */
	reward_2_remark: string;
	/** 奖励 */
	reward_3: number;
	/** 备注数量 */
	reward_3_remark: string;
	/** 奖励 */
	reward_4: number;
	/** 备注数量 */
	reward_4_remark: string;
}
//#endregion

//#region segment_task --- unique
declare interface ISheet_Activity_SegmentTask {
	rows: ISheetData_Activity_SegmentTask[];
	126101: ISheetData_Activity_SegmentTask;
	126102: ISheetData_Activity_SegmentTask;
	126103: ISheetData_Activity_SegmentTask;
	22082201: ISheetData_Activity_SegmentTask;
	23010301: ISheetData_Activity_SegmentTask;
	23091101: ISheetData_Activity_SegmentTask;
}
declare interface ISheetData_Activity_SegmentTask {
	/** 活动任务id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 最多完成次数 */
	max_finish_count: number;
	/** 每次完成给的奖励 */
	reward: string;
	/** 刷新周期 */
	interval: number;
}
//#endregion

//#region feed_activity_info --- unique
declare interface ISheet_Activity_FeedActivityInfo {
	rows: ISheetData_Activity_FeedActivityInfo[];
	1260: ISheetData_Activity_FeedActivityInfo;
}
declare interface ISheetData_Activity_FeedActivityInfo {
	/** 活动id */
	activity_id: number;
	/** 最多喂次数 */
	max_feed_count: number;
	/** 奖励组id */
	feed_reward_id: number;
	/** 赠送给好友次数限制 */
	friend_send_limit: number;
	/** 从好友收取次数限制 */
	friend_recv_limit: number;
	/** 食物物品ID */
	food_item_id: number[];
}
//#endregion

//#region feed_activity_reward --- group
declare interface ISheet_Activity_FeedActivityReward {
	rows: ISheetData_Activity_FeedActivityReward[];
	126001: ISheetData_Activity_FeedActivityReward[];
}
declare interface ISheetData_Activity_FeedActivityReward {
	/** 奖励id */
	id: number;
	/** 次数 */
	count: number;
	/** 奖励物品 */
	reward: string;
	/** 图片切换 */
	img_stage: number;
}
//#endregion

//#region vote_activity --- unique
declare interface ISheet_Activity_VoteActivity {
	rows: ISheetData_Activity_VoteActivity[];
	220710: ISheetData_Activity_VoteActivity;
	230620: ISheetData_Activity_VoteActivity;
	230621: ISheetData_Activity_VoteActivity;
	240451: ISheetData_Activity_VoteActivity;
	240452: ISheetData_Activity_VoteActivity;
	250890: ISheetData_Activity_VoteActivity;
	250891: ISheetData_Activity_VoteActivity;
}
declare interface ISheetData_Activity_VoteActivity {
	/** 活动id */
	id: number;
	/** 投票道具ID */
	vote_item: number;
	/** 投票ID列表用,分割，用来填写shop内的id */
	choice_id_list: string;
	/** 投票结束时间，之后不接受新投票 */
	vote_end_time: string;
}
//#endregion

//#region rpg_v2_activity --- unique
declare interface ISheet_Activity_RpgV2Activity {
	rows: ISheetData_Activity_RpgV2Activity[];
	220811: ISheetData_Activity_RpgV2Activity;
}
declare interface ISheetData_Activity_RpgV2Activity {
	activity_id: number;
	/** 玩家基础攻击 */
	base_atk: number;
	/** 怪物组 */
	monster_group: number;
	/** 三麻敌我攻击力削弱 */
	sanma_debuff: number;
	/** 特殊模式（非常规立直模式） */
	special_debuff: number;
	/** 是否可以带AI */
	has_robot: number;
	/** 对局类别 */
	category: string;
	/** 匹配模式 */
	mode: string;
	/** 对局模式 */
	room: string;
	/** 每日击破上限 */
	daily_limit: number;
	mail_template_id: number;
}
//#endregion

//#region spot_activity --- unique
declare interface ISheet_Activity_SpotActivity {
	rows: ISheetData_Activity_SpotActivity[];
	22082101: ISheetData_Activity_SpotActivity;
	22082102: ISheetData_Activity_SpotActivity;
	22082103: ISheetData_Activity_SpotActivity;
	22082104: ISheetData_Activity_SpotActivity;
	22082105: ISheetData_Activity_SpotActivity;
	23091001: ISheetData_Activity_SpotActivity;
	23091002: ISheetData_Activity_SpotActivity;
	23091003: ISheetData_Activity_SpotActivity;
	23091004: ISheetData_Activity_SpotActivity;
	23091005: ISheetData_Activity_SpotActivity;
	23091006: ISheetData_Activity_SpotActivity;
	23091007: ISheetData_Activity_SpotActivity;
	23091008: ISheetData_Activity_SpotActivity;
	23091009: ISheetData_Activity_SpotActivity;
	24060401: ISheetData_Activity_SpotActivity;
	24060402: ISheetData_Activity_SpotActivity;
	24060403: ISheetData_Activity_SpotActivity;
	24060404: ISheetData_Activity_SpotActivity;
	24060405: ISheetData_Activity_SpotActivity;
	24060406: ISheetData_Activity_SpotActivity;
	24060407: ISheetData_Activity_SpotActivity;
	24060408: ISheetData_Activity_SpotActivity;
	24060409: ISheetData_Activity_SpotActivity;
	24060410: ISheetData_Activity_SpotActivity;
	24060411: ISheetData_Activity_SpotActivity;
	24060412: ISheetData_Activity_SpotActivity;
}
declare interface ISheetData_Activity_SpotActivity {
	/** 剧情id */
	unique_id: number;
	/** 活动id */
	activity_id: number;
	/** 前置依赖剧情解锁 */
	dep: number;
	/** 解锁天数 */
	limit_day: number;
	/** 解锁基础任务id */
	unlock_task_id: number;
	/** 解锁任务对应活动id */
	unlock_task_activity_id: number;
	/** 剧情锁同一组别 */
	spot_group: number;
	/** 解锁编辑器入口的道具 */
	unlock_spot_item: string;
	/** 交互剧情的路径 */
	content_path: string;
	/** 标题 */
	title: number;
	/** 副标题 */
	subtitle_title: number;
	/** 解锁结局道具 */
	unlock_item: string;
	/** 被某个结局id解锁 */
	unlock_by_ending_id: number;
	/** 完成ending_id后解锁unique_id */
	unlock_ending_id: string[];
	/** 关键选项分支，每段剧情第一个 */
	ending_id: number[];
	/** 封面图 */
	ending_res: string;
	/** 关键选项分支可用道具解锁依赖 */
	ending_id_dep: number[];
	/** 结局奖励 */
	reward: string;
}
//#endregion

//#region activity_item --- unique
declare interface ISheet_Activity_ActivityItem {
	rows: ISheetData_Activity_ActivityItem[];
	221209: ISheetData_Activity_ActivityItem;
	230142: ISheetData_Activity_ActivityItem;
	230209: ISheetData_Activity_ActivityItem;
	230309: ISheetData_Activity_ActivityItem;
	230412: ISheetData_Activity_ActivityItem;
	230509: ISheetData_Activity_ActivityItem;
	230611: ISheetData_Activity_ActivityItem;
	230708: ISheetData_Activity_ActivityItem;
	230818: ISheetData_Activity_ActivityItem;
	230907: ISheetData_Activity_ActivityItem;
	231021: ISheetData_Activity_ActivityItem;
	231125: ISheetData_Activity_ActivityItem;
	231220: ISheetData_Activity_ActivityItem;
	240113: ISheetData_Activity_ActivityItem;
	240208: ISheetData_Activity_ActivityItem;
	240304: ISheetData_Activity_ActivityItem;
	240442: ISheetData_Activity_ActivityItem;
	240504: ISheetData_Activity_ActivityItem;
	240612: ISheetData_Activity_ActivityItem;
	240712: ISheetData_Activity_ActivityItem;
	240821: ISheetData_Activity_ActivityItem;
	240823: ISheetData_Activity_ActivityItem;
	240824: ISheetData_Activity_ActivityItem;
	240825: ISheetData_Activity_ActivityItem;
	240826: ISheetData_Activity_ActivityItem;
	240912: ISheetData_Activity_ActivityItem;
	241012: ISheetData_Activity_ActivityItem;
	241112: ISheetData_Activity_ActivityItem;
	241212: ISheetData_Activity_ActivityItem;
	250122: ISheetData_Activity_ActivityItem;
	250212: ISheetData_Activity_ActivityItem;
	250312: ISheetData_Activity_ActivityItem;
	250422: ISheetData_Activity_ActivityItem;
	250512: ISheetData_Activity_ActivityItem;
	250612: ISheetData_Activity_ActivityItem;
	250712: ISheetData_Activity_ActivityItem;
	250832: ISheetData_Activity_ActivityItem;
	250912: ISheetData_Activity_ActivityItem;
}
declare interface ISheetData_Activity_ActivityItem {
	/** 活动id */
	activity_id: number;
	/** 发放道具到背包 */
	item_list: string;
}
//#endregion

//#region upgrade_activity --- unique
declare interface ISheet_Activity_UpgradeActivity {
	rows: ISheetData_Activity_UpgradeActivity[];
	230101: ISheetData_Activity_UpgradeActivity;
}
declare interface ISheetData_Activity_UpgradeActivity {
	/** 活动id */
	activity_id: number;
	/** 奖励邮件 */
	mail_id: number;
	/** 升级消耗的物品，id-count,id-count形式 */
	consume_item: string;
	/** 总等级奖励组id */
	total_reward_id: number;
	/** 奖励组id */
	reward_id: number[];
}
//#endregion

//#region upgrade_activity_reward --- group
declare interface ISheet_Activity_UpgradeActivityReward {
	rows: ISheetData_Activity_UpgradeActivityReward[];
	23010101: ISheetData_Activity_UpgradeActivityReward[];
	23010102: ISheetData_Activity_UpgradeActivityReward[];
	23010103: ISheetData_Activity_UpgradeActivityReward[];
	23010199: ISheetData_Activity_UpgradeActivityReward[];
}
declare interface ISheetData_Activity_UpgradeActivityReward {
	/** 奖励组id，group形式 */
	id: number;
	/** 等级 */
	level: number;
	/** 升级到level等级的奖励 */
	reward: string;
	/** 解锁天数 */
	unlock_day: number;
	highlight: number;
}
//#endregion

//#region friend_gift_activity --- unique
declare interface ISheet_Activity_FriendGiftActivity {
	rows: ISheetData_Activity_FriendGiftActivity[];
	230102: ISheetData_Activity_FriendGiftActivity;
}
declare interface ISheetData_Activity_FriendGiftActivity {
	/** 活动id */
	activity_id: number;
	/** 赠送给好友次数限制 */
	friend_send_limit: number;
	/** 赠送好友自己消耗的个数 */
	friend_send_consume: number;
	/** 从好友收取次数限制 */
	friend_recv_limit: number;
	/** 赠送人可以额外获得的数量 */
	extra_gift: number;
	/** 礼品id */
	gift_item_id: number[];
}
//#endregion

//#region upgrade_activity_display --- group
declare interface ISheet_Activity_UpgradeActivityDisplay {
	rows: ISheetData_Activity_UpgradeActivityDisplay[];
	23010101: ISheetData_Activity_UpgradeActivityDisplay[];
	23010102: ISheetData_Activity_UpgradeActivityDisplay[];
	23010103: ISheetData_Activity_UpgradeActivityDisplay[];
	23010199: ISheetData_Activity_UpgradeActivityDisplay[];
}
declare interface ISheetData_Activity_UpgradeActivityDisplay {
	/** 奖励组id，group形式 */
	id: number;
	/** 等级 */
	level: number;
	display : number;
}
//#endregion

//#region activity_desktop --- group
declare interface ISheet_Activity_ActivityDesktop {
	rows: ISheetData_Activity_ActivityDesktop[];
	230143: ISheetData_Activity_ActivityDesktop[];
}
declare interface ISheetData_Activity_ActivityDesktop {
	activity_id: number;
	desktop_id: number;
	interval: number;
	interval_type: number;
}
//#endregion

//#region gacha_activity_info --- unique
declare interface ISheet_Activity_GachaActivityInfo {
	rows: ISheetData_Activity_GachaActivityInfo[];
	230301: ISheetData_Activity_GachaActivityInfo;
	231001: ISheetData_Activity_GachaActivityInfo;
	240901: ISheetData_Activity_GachaActivityInfo;
	250501: ISheetData_Activity_GachaActivityInfo;
}
declare interface ISheetData_Activity_GachaActivityInfo {
	/** 活动id */
	activity_id: number;
	/** 奖池 */
	gacha_pool: number;
	/** 控制池 */
	gacha_control: number;
	/** 触发sp奖的抽取次数-抽够次数就送 */
	sp_trigger_times: number;
	/** SP赏 */
	sp_rewards: string;
	/** 抽取消耗物品 */
	consume: string;
}
//#endregion

//#region gacha_pool --- group
declare interface ISheet_Activity_GachaPool {
	rows: ISheetData_Activity_GachaPool[];
	101: ISheetData_Activity_GachaPool[];
	102: ISheetData_Activity_GachaPool[];
	103: ISheetData_Activity_GachaPool[];
	104: ISheetData_Activity_GachaPool[];
}
declare interface ISheetData_Activity_GachaPool {
	/** 奖品池id */
	pool_id: number;
	/** 奖品id */
	reward_id: number;
	/** 这种奖品在扭蛋机中一共有几份 */
	count: number;
	/** 稀有度 */
	rare: number;
	/** 奖品 */
	item: string;
	/** 单个奖品的权重 */
	weight: number;
}
//#endregion

//#region gacha_control --- group
declare interface ISheet_Activity_GachaControl {
	rows: ISheetData_Activity_GachaControl[];
	101: ISheetData_Activity_GachaControl[];
	102: ISheetData_Activity_GachaControl[];
	103: ISheetData_Activity_GachaControl[];
	104: ISheetData_Activity_GachaControl[];
}
declare interface ISheetData_Activity_GachaControl {
	id: number;
	/** 稀有度 */
	rare: number;
	reward_count: number;
	/** <=count，最多可以抽到reward_count个 */
	count: number;
}
//#endregion

//#region task_display --- group
declare interface ISheet_Activity_TaskDisplay {
	rows: ISheetData_Activity_TaskDisplay[];
	230601: ISheetData_Activity_TaskDisplay[];
}
declare interface ISheetData_Activity_TaskDisplay {
	activity_id: number;
	/** 自然日 */
	day: number;
	/** 0为特殊整体，123为顺序 */
	task_serial_number: number;
	/** 0普通任务，1问答，999整体条件 */
	task_type: number;
	/** 任务编号 */
	period_task_id: number;
	/** 正确答案（当成str拆） */
	answer: number;
	/** 答对的文本 */
	right_str: number;
	/** 答错的文本 */
	wrong_str: number;
}
//#endregion

//#region simulation_activity_info --- unique
declare interface ISheet_Activity_SimulationActivityInfo {
	rows: ISheetData_Activity_SimulationActivityInfo[];
	230801: ISheetData_Activity_SimulationActivityInfo;
}
declare interface ISheetData_Activity_SimulationActivityInfo {
	/** 活动ID */
	activity_id: number;
	/** 体力值物品ID */
	stamina_item_id: number;
}
//#endregion

//#region reward_mail --- unique
declare interface ISheet_Activity_RewardMail {
	rows: ISheetData_Activity_RewardMail[];
	230803: ISheetData_Activity_RewardMail;
	231204: ISheetData_Activity_RewardMail;
	240103: ISheetData_Activity_RewardMail;
	240302: ISheetData_Activity_RewardMail;
	240404: ISheetData_Activity_RewardMail;
	240603: ISheetData_Activity_RewardMail;
	240802: ISheetData_Activity_RewardMail;
	240812: ISheetData_Activity_RewardMail;
	241105: ISheetData_Activity_RewardMail;
	241203: ISheetData_Activity_RewardMail;
	250104: ISheetData_Activity_RewardMail;
	250112: ISheetData_Activity_RewardMail;
	250202: ISheetData_Activity_RewardMail;
	250403: ISheetData_Activity_RewardMail;
	250604: ISheetData_Activity_RewardMail;
	250821: ISheetData_Activity_RewardMail;
	250894: ISheetData_Activity_RewardMail;
	250902: ISheetData_Activity_RewardMail;
}
declare interface ISheetData_Activity_RewardMail {
	/** 活动ID */
	activity_id: number;
	/** 对应邮件 */
	mail_template_id: number;
}
//#endregion

//#region combining_activity_info --- unique
declare interface ISheet_Activity_CombiningActivityInfo {
	rows: ISheetData_Activity_CombiningActivityInfo[];
	231201: ISheetData_Activity_CombiningActivityInfo;
	250601: ISheetData_Activity_CombiningActivityInfo;
}
declare interface ISheetData_Activity_CombiningActivityInfo {
	/** 活动id */
	activity_id: number;
	/** 材料桶1id */
	craft_bin: number[];
	/** 材料桶1费用 */
	craft_bin_price: string[];
	/** 材料桶1解锁积分 */
	craft_bin_unlock: number[];
	/** 积分道具id */
	point_item: number;
	/** 红包池 */
	bonus_item_pool: number;
	/** 红包生成概率百分比 */
	bonus_rate: number;
	/** 每日最大红包生成数 */
	bonus_daily_limit: number;
	/** 双订单价格倍率 */
	multi_order_rate: number;
	/** 飞包动画单硬币对应代币数 */
	one_coin_num: number;
	/** 飞包硬币最大数量 */
	coin_num_max: number;
}
//#endregion

//#region combining_craft_pool --- group
declare interface ISheet_Activity_CombiningCraftPool {
	rows: ISheetData_Activity_CombiningCraftPool[];
	23120101: ISheetData_Activity_CombiningCraftPool[];
	23120102: ISheetData_Activity_CombiningCraftPool[];
	23120103: ISheetData_Activity_CombiningCraftPool[];
	25060101: ISheetData_Activity_CombiningCraftPool[];
	25060102: ISheetData_Activity_CombiningCraftPool[];
	25060103: ISheetData_Activity_CombiningCraftPool[];
}
declare interface ISheetData_Activity_CombiningCraftPool {
	/** 材料桶id */
	bin_id: number;
	/** 素材id */
	craft_id: number;
	/** 随机权重（材料桶内） */
	weight: number;
}
//#endregion

//#region combining_map --- group
declare interface ISheet_Activity_CombiningMap {
	rows: ISheetData_Activity_CombiningMap[];
	231201: ISheetData_Activity_CombiningMap[];
	250601: ISheetData_Activity_CombiningMap[];
}
declare interface ISheetData_Activity_CombiningMap {
	/** 活动id */
	activity_id: number;
	/** 分数道具id */
	point_item_id: number;
	/** 道具数量 */
	point_item_count: number;
	/** 合成格数量 */
	workbench_count: number;
}
//#endregion

//#region combining_order --- unique
declare interface ISheet_Activity_CombiningOrder {
	rows: ISheetData_Activity_CombiningOrder[];
	23120101: ISheetData_Activity_CombiningOrder;
	23120102: ISheetData_Activity_CombiningOrder;
	23120103: ISheetData_Activity_CombiningOrder;
	23120104: ISheetData_Activity_CombiningOrder;
	23120105: ISheetData_Activity_CombiningOrder;
	23120106: ISheetData_Activity_CombiningOrder;
	23120107: ISheetData_Activity_CombiningOrder;
	23120108: ISheetData_Activity_CombiningOrder;
	23120109: ISheetData_Activity_CombiningOrder;
	23120110: ISheetData_Activity_CombiningOrder;
	23120111: ISheetData_Activity_CombiningOrder;
	23120112: ISheetData_Activity_CombiningOrder;
	23120113: ISheetData_Activity_CombiningOrder;
	23120114: ISheetData_Activity_CombiningOrder;
	23120115: ISheetData_Activity_CombiningOrder;
	25060101: ISheetData_Activity_CombiningOrder;
	25060102: ISheetData_Activity_CombiningOrder;
	25060103: ISheetData_Activity_CombiningOrder;
	25060104: ISheetData_Activity_CombiningOrder;
	25060105: ISheetData_Activity_CombiningOrder;
	25060106: ISheetData_Activity_CombiningOrder;
	25060107: ISheetData_Activity_CombiningOrder;
	25060108: ISheetData_Activity_CombiningOrder;
	25060109: ISheetData_Activity_CombiningOrder;
	25060110: ISheetData_Activity_CombiningOrder;
	25060111: ISheetData_Activity_CombiningOrder;
	25060112: ISheetData_Activity_CombiningOrder;
	25060113: ISheetData_Activity_CombiningOrder;
	25060114: ISheetData_Activity_CombiningOrder;
	25060115: ISheetData_Activity_CombiningOrder;
}
declare interface ISheetData_Activity_CombiningOrder {
	/** 订单组id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 该组素材等级-数量 */
	order_items: string;
	/** 双订单素材等级-数量 */
	multi_order_items: string;
	/** 解锁日 */
	unlock_day: number;
}
//#endregion

//#region combining_craft --- unique
declare interface ISheet_Activity_CombiningCraft {
	rows: ISheetData_Activity_CombiningCraft[];
	1001: ISheetData_Activity_CombiningCraft;
	1002: ISheetData_Activity_CombiningCraft;
	1003: ISheetData_Activity_CombiningCraft;
	1004: ISheetData_Activity_CombiningCraft;
	1005: ISheetData_Activity_CombiningCraft;
	2001: ISheetData_Activity_CombiningCraft;
	2002: ISheetData_Activity_CombiningCraft;
	2003: ISheetData_Activity_CombiningCraft;
	2004: ISheetData_Activity_CombiningCraft;
	2005: ISheetData_Activity_CombiningCraft;
	3001: ISheetData_Activity_CombiningCraft;
	3002: ISheetData_Activity_CombiningCraft;
	3003: ISheetData_Activity_CombiningCraft;
	3004: ISheetData_Activity_CombiningCraft;
	3005: ISheetData_Activity_CombiningCraft;
	4001: ISheetData_Activity_CombiningCraft;
	4002: ISheetData_Activity_CombiningCraft;
	4003: ISheetData_Activity_CombiningCraft;
	4004: ISheetData_Activity_CombiningCraft;
	4005: ISheetData_Activity_CombiningCraft;
	5001: ISheetData_Activity_CombiningCraft;
	5002: ISheetData_Activity_CombiningCraft;
	5003: ISheetData_Activity_CombiningCraft;
	11001: ISheetData_Activity_CombiningCraft;
	11002: ISheetData_Activity_CombiningCraft;
	11003: ISheetData_Activity_CombiningCraft;
	11004: ISheetData_Activity_CombiningCraft;
	11005: ISheetData_Activity_CombiningCraft;
	12001: ISheetData_Activity_CombiningCraft;
	12002: ISheetData_Activity_CombiningCraft;
	12003: ISheetData_Activity_CombiningCraft;
	12004: ISheetData_Activity_CombiningCraft;
	12005: ISheetData_Activity_CombiningCraft;
	13001: ISheetData_Activity_CombiningCraft;
	13002: ISheetData_Activity_CombiningCraft;
	13003: ISheetData_Activity_CombiningCraft;
	13004: ISheetData_Activity_CombiningCraft;
	13005: ISheetData_Activity_CombiningCraft;
	14001: ISheetData_Activity_CombiningCraft;
	14002: ISheetData_Activity_CombiningCraft;
	14003: ISheetData_Activity_CombiningCraft;
	14004: ISheetData_Activity_CombiningCraft;
	14005: ISheetData_Activity_CombiningCraft;
	15001: ISheetData_Activity_CombiningCraft;
	15002: ISheetData_Activity_CombiningCraft;
	15003: ISheetData_Activity_CombiningCraft;
}
declare interface ISheetData_Activity_CombiningCraft {
	/** 素材id */
	id: number;
	/** 活动id */
	activity_id: number;
	/** 素材分组，用于伪随机 */
	group: number;
	/** 回收价格 */
	recycling_price: string;
	/** 等级 */
	level: number;
	/** 升级后素材id */
	upgrade_craft_id: number;
	/** 订单解锁积分 */
	order_unlock_point: number;
	/** 订单价格 */
	order_price: string;
	/** 是否为红包 */
	if_bonus: number;
	/** 材料资源名 */
	img_name: string;
	/** 材料名 */
	craft_name: number;
	/** 材料描述 */
	craft_desc: number;
}
//#endregion

//#region combining_customer --- unique
declare interface ISheet_Activity_CombiningCustomer {
	rows: ISheetData_Activity_CombiningCustomer[];
	1001: ISheetData_Activity_CombiningCustomer;
	1002: ISheetData_Activity_CombiningCustomer;
	1003: ISheetData_Activity_CombiningCustomer;
	1004: ISheetData_Activity_CombiningCustomer;
	1005: ISheetData_Activity_CombiningCustomer;
	1006: ISheetData_Activity_CombiningCustomer;
	1007: ISheetData_Activity_CombiningCustomer;
	1008: ISheetData_Activity_CombiningCustomer;
	1009: ISheetData_Activity_CombiningCustomer;
	1010: ISheetData_Activity_CombiningCustomer;
	1011: ISheetData_Activity_CombiningCustomer;
	1012: ISheetData_Activity_CombiningCustomer;
	1013: ISheetData_Activity_CombiningCustomer;
	1014: ISheetData_Activity_CombiningCustomer;
	1015: ISheetData_Activity_CombiningCustomer;
	1016: ISheetData_Activity_CombiningCustomer;
	1017: ISheetData_Activity_CombiningCustomer;
	1018: ISheetData_Activity_CombiningCustomer;
	1019: ISheetData_Activity_CombiningCustomer;
	1020: ISheetData_Activity_CombiningCustomer;
	1021: ISheetData_Activity_CombiningCustomer;
	1022: ISheetData_Activity_CombiningCustomer;
	1023: ISheetData_Activity_CombiningCustomer;
	1024: ISheetData_Activity_CombiningCustomer;
	1025: ISheetData_Activity_CombiningCustomer;
	1026: ISheetData_Activity_CombiningCustomer;
	1027: ISheetData_Activity_CombiningCustomer;
	1028: ISheetData_Activity_CombiningCustomer;
	1029: ISheetData_Activity_CombiningCustomer;
	1030: ISheetData_Activity_CombiningCustomer;
	1031: ISheetData_Activity_CombiningCustomer;
	1032: ISheetData_Activity_CombiningCustomer;
	1033: ISheetData_Activity_CombiningCustomer;
	1034: ISheetData_Activity_CombiningCustomer;
	1035: ISheetData_Activity_CombiningCustomer;
	1036: ISheetData_Activity_CombiningCustomer;
	1037: ISheetData_Activity_CombiningCustomer;
	1038: ISheetData_Activity_CombiningCustomer;
	1039: ISheetData_Activity_CombiningCustomer;
	1040: ISheetData_Activity_CombiningCustomer;
	1041: ISheetData_Activity_CombiningCustomer;
	1042: ISheetData_Activity_CombiningCustomer;
	1043: ISheetData_Activity_CombiningCustomer;
	1044: ISheetData_Activity_CombiningCustomer;
	1045: ISheetData_Activity_CombiningCustomer;
	1046: ISheetData_Activity_CombiningCustomer;
	1047: ISheetData_Activity_CombiningCustomer;
	1048: ISheetData_Activity_CombiningCustomer;
	1049: ISheetData_Activity_CombiningCustomer;
	1050: ISheetData_Activity_CombiningCustomer;
	1051: ISheetData_Activity_CombiningCustomer;
	1052: ISheetData_Activity_CombiningCustomer;
	1053: ISheetData_Activity_CombiningCustomer;
	1054: ISheetData_Activity_CombiningCustomer;
	1055: ISheetData_Activity_CombiningCustomer;
	1056: ISheetData_Activity_CombiningCustomer;
	1057: ISheetData_Activity_CombiningCustomer;
	1058: ISheetData_Activity_CombiningCustomer;
}
declare interface ISheetData_Activity_CombiningCustomer {
	/** 客人id */
	customer_id: number;
	/** 活动id */
	activity_id: number;
	/** 订单类型 */
	order_type: number;
	/** 出现位置左中右 */
	customer_location: number;
	/** 客人素材 */
	customer_skin: string;
	/** 是否使用loading图 */
	customer_loading: number;
	/** 完成语音 */
	complete_sound: string;
}
//#endregion

//#region chest_replace_up --- group
declare interface ISheet_Activity_ChestReplaceUp {
	rows: ISheetData_Activity_ChestReplaceUp[];
	231241: ISheetData_Activity_ChestReplaceUp[];
	231242: ISheetData_Activity_ChestReplaceUp[];
	231243: ISheetData_Activity_ChestReplaceUp[];
	231244: ISheetData_Activity_ChestReplaceUp[];
	231245: ISheetData_Activity_ChestReplaceUp[];
	231246: ISheetData_Activity_ChestReplaceUp[];
	240151: ISheetData_Activity_ChestReplaceUp[];
	240152: ISheetData_Activity_ChestReplaceUp[];
	240153: ISheetData_Activity_ChestReplaceUp[];
	240154: ISheetData_Activity_ChestReplaceUp[];
	240155: ISheetData_Activity_ChestReplaceUp[];
	240156: ISheetData_Activity_ChestReplaceUp[];
	240157: ISheetData_Activity_ChestReplaceUp[];
	240158: ISheetData_Activity_ChestReplaceUp[];
	240159: ISheetData_Activity_ChestReplaceUp[];
	240160: ISheetData_Activity_ChestReplaceUp[];
	240161: ISheetData_Activity_ChestReplaceUp[];
	240162: ISheetData_Activity_ChestReplaceUp[];
	240163: ISheetData_Activity_ChestReplaceUp[];
	240164: ISheetData_Activity_ChestReplaceUp[];
	240165: ISheetData_Activity_ChestReplaceUp[];
	240166: ISheetData_Activity_ChestReplaceUp[];
	240167: ISheetData_Activity_ChestReplaceUp[];
	240168: ISheetData_Activity_ChestReplaceUp[];
	240169: ISheetData_Activity_ChestReplaceUp[];
	240170: ISheetData_Activity_ChestReplaceUp[];
	240171: ISheetData_Activity_ChestReplaceUp[];
	240172: ISheetData_Activity_ChestReplaceUp[];
	240173: ISheetData_Activity_ChestReplaceUp[];
	240174: ISheetData_Activity_ChestReplaceUp[];
	240175: ISheetData_Activity_ChestReplaceUp[];
	240176: ISheetData_Activity_ChestReplaceUp[];
	240177: ISheetData_Activity_ChestReplaceUp[];
	240178: ISheetData_Activity_ChestReplaceUp[];
	240179: ISheetData_Activity_ChestReplaceUp[];
	240211: ISheetData_Activity_ChestReplaceUp[];
	240212: ISheetData_Activity_ChestReplaceUp[];
	240213: ISheetData_Activity_ChestReplaceUp[];
	240314: ISheetData_Activity_ChestReplaceUp[];
	240315: ISheetData_Activity_ChestReplaceUp[];
	240316: ISheetData_Activity_ChestReplaceUp[];
	240431: ISheetData_Activity_ChestReplaceUp[];
	240432: ISheetData_Activity_ChestReplaceUp[];
	240514: ISheetData_Activity_ChestReplaceUp[];
	240515: ISheetData_Activity_ChestReplaceUp[];
	240516: ISheetData_Activity_ChestReplaceUp[];
	240630: ISheetData_Activity_ChestReplaceUp[];
	240631: ISheetData_Activity_ChestReplaceUp[];
	240632: ISheetData_Activity_ChestReplaceUp[];
	240633: ISheetData_Activity_ChestReplaceUp[];
	240634: ISheetData_Activity_ChestReplaceUp[];
	240635: ISheetData_Activity_ChestReplaceUp[];
	240724: ISheetData_Activity_ChestReplaceUp[];
	240725: ISheetData_Activity_ChestReplaceUp[];
	240726: ISheetData_Activity_ChestReplaceUp[];
	240727: ISheetData_Activity_ChestReplaceUp[];
	240840: ISheetData_Activity_ChestReplaceUp[];
	240841: ISheetData_Activity_ChestReplaceUp[];
	240842: ISheetData_Activity_ChestReplaceUp[];
	240843: ISheetData_Activity_ChestReplaceUp[];
	240844: ISheetData_Activity_ChestReplaceUp[];
	240930: ISheetData_Activity_ChestReplaceUp[];
	240931: ISheetData_Activity_ChestReplaceUp[];
	240932: ISheetData_Activity_ChestReplaceUp[];
	240933: ISheetData_Activity_ChestReplaceUp[];
	241030: ISheetData_Activity_ChestReplaceUp[];
	241031: ISheetData_Activity_ChestReplaceUp[];
	241032: ISheetData_Activity_ChestReplaceUp[];
	241033: ISheetData_Activity_ChestReplaceUp[];
	241034: ISheetData_Activity_ChestReplaceUp[];
	241035: ISheetData_Activity_ChestReplaceUp[];
	241131: ISheetData_Activity_ChestReplaceUp[];
	241132: ISheetData_Activity_ChestReplaceUp[];
	241230: ISheetData_Activity_ChestReplaceUp[];
	241231: ISheetData_Activity_ChestReplaceUp[];
	241232: ISheetData_Activity_ChestReplaceUp[];
	241233: ISheetData_Activity_ChestReplaceUp[];
	241234: ISheetData_Activity_ChestReplaceUp[];
	241235: ISheetData_Activity_ChestReplaceUp[];
	241236: ISheetData_Activity_ChestReplaceUp[];
	241237: ISheetData_Activity_ChestReplaceUp[];
	241238: ISheetData_Activity_ChestReplaceUp[];
	241239: ISheetData_Activity_ChestReplaceUp[];
	250128: ISheetData_Activity_ChestReplaceUp[];
	250129: ISheetData_Activity_ChestReplaceUp[];
	250164: ISheetData_Activity_ChestReplaceUp[];
	250165: ISheetData_Activity_ChestReplaceUp[];
	250166: ISheetData_Activity_ChestReplaceUp[];
	250167: ISheetData_Activity_ChestReplaceUp[];
	250168: ISheetData_Activity_ChestReplaceUp[];
	250169: ISheetData_Activity_ChestReplaceUp[];
	250170: ISheetData_Activity_ChestReplaceUp[];
	250171: ISheetData_Activity_ChestReplaceUp[];
	250172: ISheetData_Activity_ChestReplaceUp[];
	250173: ISheetData_Activity_ChestReplaceUp[];
	250174: ISheetData_Activity_ChestReplaceUp[];
	250175: ISheetData_Activity_ChestReplaceUp[];
	250176: ISheetData_Activity_ChestReplaceUp[];
	250177: ISheetData_Activity_ChestReplaceUp[];
	250178: ISheetData_Activity_ChestReplaceUp[];
	250179: ISheetData_Activity_ChestReplaceUp[];
	250180: ISheetData_Activity_ChestReplaceUp[];
	250181: ISheetData_Activity_ChestReplaceUp[];
	250182: ISheetData_Activity_ChestReplaceUp[];
	250183: ISheetData_Activity_ChestReplaceUp[];
	250184: ISheetData_Activity_ChestReplaceUp[];
	250185: ISheetData_Activity_ChestReplaceUp[];
	250186: ISheetData_Activity_ChestReplaceUp[];
	250187: ISheetData_Activity_ChestReplaceUp[];
	250188: ISheetData_Activity_ChestReplaceUp[];
	250189: ISheetData_Activity_ChestReplaceUp[];
	250190: ISheetData_Activity_ChestReplaceUp[];
	250191: ISheetData_Activity_ChestReplaceUp[];
	250192: ISheetData_Activity_ChestReplaceUp[];
	250193: ISheetData_Activity_ChestReplaceUp[];
	250194: ISheetData_Activity_ChestReplaceUp[];
	250195: ISheetData_Activity_ChestReplaceUp[];
	250196: ISheetData_Activity_ChestReplaceUp[];
	250197: ISheetData_Activity_ChestReplaceUp[];
	250230: ISheetData_Activity_ChestReplaceUp[];
	250231: ISheetData_Activity_ChestReplaceUp[];
	250232: ISheetData_Activity_ChestReplaceUp[];
	250233: ISheetData_Activity_ChestReplaceUp[];
	250330: ISheetData_Activity_ChestReplaceUp[];
	250331: ISheetData_Activity_ChestReplaceUp[];
	250332: ISheetData_Activity_ChestReplaceUp[];
	250333: ISheetData_Activity_ChestReplaceUp[];
	250440: ISheetData_Activity_ChestReplaceUp[];
	250441: ISheetData_Activity_ChestReplaceUp[];
	250530: ISheetData_Activity_ChestReplaceUp[];
	250531: ISheetData_Activity_ChestReplaceUp[];
	250532: ISheetData_Activity_ChestReplaceUp[];
	250533: ISheetData_Activity_ChestReplaceUp[];
	250630: ISheetData_Activity_ChestReplaceUp[];
	250631: ISheetData_Activity_ChestReplaceUp[];
	250632: ISheetData_Activity_ChestReplaceUp[];
	250633: ISheetData_Activity_ChestReplaceUp[];
	250634: ISheetData_Activity_ChestReplaceUp[];
	250635: ISheetData_Activity_ChestReplaceUp[];
	250730: ISheetData_Activity_ChestReplaceUp[];
	250731: ISheetData_Activity_ChestReplaceUp[];
	250732: ISheetData_Activity_ChestReplaceUp[];
	250733: ISheetData_Activity_ChestReplaceUp[];
	250850: ISheetData_Activity_ChestReplaceUp[];
	250851: ISheetData_Activity_ChestReplaceUp[];
	250852: ISheetData_Activity_ChestReplaceUp[];
	250853: ISheetData_Activity_ChestReplaceUp[];
	250854: ISheetData_Activity_ChestReplaceUp[];
	250925: ISheetData_Activity_ChestReplaceUp[];
	250926: ISheetData_Activity_ChestReplaceUp[];
	250927: ISheetData_Activity_ChestReplaceUp[];
	250928: ISheetData_Activity_ChestReplaceUp[];
}
declare interface ISheetData_Activity_ChestReplaceUp {
	/** 活动id */
	activity_id: number;
	/** 宝箱ID（索引） */
	chest_id: number;
	/** chest.item_pool.id（索引） */
	item_pool_id: number;
	/** 资源id（索引） */
	resource_id: number;
	/** 资源数量（索引） */
	resource_count: number;
	/** 替换权重（结果） */
	weight: number;
	worth: number;
}
//#endregion

//#region village_activity_info --- unique
declare interface ISheet_Activity_VillageActivityInfo {
	rows: ISheetData_Activity_VillageActivityInfo[];
	240101: ISheetData_Activity_VillageActivityInfo;
}
declare interface ISheetData_Activity_VillageActivityInfo {
	/** 活动id */
	activity_id: number;
	/** 工人物品ID */
	worker_item_id: number;
	/** 每回合消耗道具 */
	round_consume: string;
	/** 每个玩家只能拥有列表中的一个建筑，具体是哪个由玩家的账号id决定 */
	random_building: string;
	/** 食物道具id */
	food_item_id: number;
	/** 远征消耗食物数量 */
	trip_consume: number;
	/** 远征一次消耗时间/秒 */
	trip_cold_down: number;
	/** 远征一次消耗回合数 */
	trip_round: number;
	/** 随机建筑远征系数1 */
	trip_reward: string[];
	/** 白龙阶段需求[0] */
	stage_require: string[];
}
//#endregion

//#region village_building --- group
declare interface ISheet_Activity_VillageBuilding {
	rows: ISheetData_Activity_VillageBuilding[];
	240101: ISheetData_Activity_VillageBuilding[];
}
declare interface ISheetData_Activity_VillageBuilding {
	/** 活动id */
	activity_id: number;
	/** 建筑ID */
	building_id: number;
	/** 是否是初始建筑 */
	initial: number;
	/** 建筑名称strid */
	building_name: number;
	/** 等级 */
	level: number;
	/** 下等级id */
	next_level_id: number;
	/** 每个工人每小时生产内容 */
	produce_item: string;
	/** 基础产出 */
	base_produce: string;
	/** 升到下级需求材料 */
	upgrade_item: string;
	max_worker_count: number;
	/** 升到下级奖励（繁荣度） */
	upgrade_reward: string;
	/** 建筑阶段图 */
	building_stage: number;
	/** 每个工人每小时消耗食物数量 */
	worker_consume: number;
	/** 特殊功能 */
	func: string;
	/** 特殊参数 */
	args: number[];
	/** 建筑类别 */
	type: number;
}
//#endregion

//#region village_task --- group
declare interface ISheet_Activity_VillageTask {
	rows: ISheetData_Activity_VillageTask[];
	240101: ISheetData_Activity_VillageTask[];
}
declare interface ISheetData_Activity_VillageTask {
	/** 活动id */
	activity_id: number;
	/** 委托id */
	mission_id: number;
	/** 委托文本strid */
	mission_str: number;
	/** 果园类型 */
	fruit_type: string;
	/** 委托消耗 */
	consume: string;
	/** 委托奖励 */
	reward: string;
	/** 活动开始后N天解锁 */
	unlock_day: number;
	/** 繁荣度达到对应值解锁 */
	unlock_point: string;
	/** 是否可以循环完成 */
	if_loop: number;
}
//#endregion

//#region liver_event_info --- unique
declare interface ISheet_Activity_LiverEventInfo {
	rows: ISheetData_Activity_LiverEventInfo[];
	240301: ISheetData_Activity_LiverEventInfo;
}
declare interface ISheetData_Activity_LiverEventInfo {
	/** 活动id */
	activity_id: number;
	/** 初始关注人数 */
	follower_amount: number;
	/** 每日关注人数增加 */
	daily_follower_plus: number;
	/** 直播间简介文本，str/event表初始值，每日递增+1，共14天，封顶2243 */
	intro_text: number;
	/** 最多保留文本条数 */
	text_max_amount: number;
	/** 两个随机值毫秒生成一条文本 */
	text_create_timer: string;
	/** 生成文本的种类，1=雀魂角色纯文本，2=雀魂角色打赏文本，3=路人角色纯文本，4=路人角色打赏无文本 */
	text_create_weight: string;
	/** 每条弹幕在左侧滚动时间ms */
	rolltext_speed: number;
	/** 出现打赏时，四种类权重 */
	gift_weight: string;
	/** 左下角四种礼物的展示时间 */
	rolltext_gift_time: string;
	/** 人气值道具的id */
	key_item_id: number;
	/** 表情的时间区块范围ms */
	face_time_block: string;
	/** 每个时间区块，随机0普通，1开心，2生气，3疑惑的权重 */
	face_weight: string;
}
//#endregion

//#region liver_text_info --- group
declare interface ISheet_Activity_LiverTextInfo {
	rows: ISheetData_Activity_LiverTextInfo[];
	240301: ISheetData_Activity_LiverTextInfo[];
}
declare interface ISheetData_Activity_LiverTextInfo {
	/** 活动id */
	activity_id: number;
	/** 角色类型1=雀魂角色，2=路人id */
	type: number;
	/** 雀魂角色的六位id */
	chara_id: number;
	/** 路人角色的str/event的id */
	mob_str_id: number;
	/** 普通聊天随机范围，连续数字 */
	normal_text: string;
	/** 打赏文本随机范围，连续数字，为空为只打赏不说话 */
	gift_text: string;
}
//#endregion

//#region festival_activity --- unique
declare interface ISheet_Activity_FestivalActivity {
	rows: ISheetData_Activity_FestivalActivity[];
	240401: ISheetData_Activity_FestivalActivity;
	250101: ISheetData_Activity_FestivalActivity;
}
declare interface ISheetData_Activity_FestivalActivity {
	/** 活动id */
	activity_id: number;
	/** 资金道具id */
	funds_id: number;
	/** 提案道具id */
	proposal_id: number;
	/** 购买提案消耗资金数量 */
	proposal_consume: number;
	/** 提案每日购买上限 */
	daily_buy_limit: number;
	/** 大成功概率 */
	success_rate: number;
	/** 失败概率 */
	fail_rate: number;
	/** 大成功资源系数 */
	success_coefficient: number;
	/** 失败资源系数 */
	fail_coefficient: number;
	/** 指标单箭头代表的值 */
	arrow_amount: number;
	/** 指标上限 */
	max_amount: number;
	/** 主界面普通提案点位数 */
	max_proposal_pos: number;
}
//#endregion

//#region festival_level --- group
declare interface ISheet_Activity_FestivalLevel {
	rows: ISheetData_Activity_FestivalLevel[];
	240401: ISheetData_Activity_FestivalLevel[];
	250101: ISheetData_Activity_FestivalLevel[];
}
declare interface ISheetData_Activity_FestivalLevel {
	/** 活动id */
	activity_id: number;
	/** 等级 */
	level: number;
	/** 等级名strid */
	level_name: number;
	/** 升到本级所需道具 */
	level_require: string;
	/** 等级图 */
	level_res: string;
	/** 本级解锁的事件数量 */
	unlock_event_count: number;
}
//#endregion

//#region festival_proposal --- group
declare interface ISheet_Activity_FestivalProposal {
	rows: ISheetData_Activity_FestivalProposal[];
	240401: ISheetData_Activity_FestivalProposal[];
	250101: ISheetData_Activity_FestivalProposal[];
}
declare interface ISheetData_Activity_FestivalProposal {
	/** 活动id */
	activity_id: number;
	/** 提案id */
	proposal_id: number;
	/** 解锁等级 */
	unlock_level: number;
	/** 选项A结果festival_ending.group_id */
	ending_group: number[];
	/** 委托人名称strid */
	client_name: number;
	/** 委托人头像 */
	client_icon: string;
	/** 委托正文strid */
	proposal_text: number;
	/** 选项A文本strid */
	option_text_a: number;
	/** 选项B文本strid */
	option_text_b: number;
}
//#endregion

//#region festival_event --- group
declare interface ISheet_Activity_FestivalEvent {
	rows: ISheetData_Activity_FestivalEvent[];
	240401: ISheetData_Activity_FestivalEvent[];
	250101: ISheetData_Activity_FestivalEvent[];
}
declare interface ISheetData_Activity_FestivalEvent {
	/** 活动id */
	activity_id: number;
	/** 事件id */
	event_id: number;
	/** 场地点位 */
	position: number;
	/** 解锁等级 */
	unlock_level: number;
	/** 选项A结果 */
	ending_group: number[];
	/** 事件标题strid */
	event_title: number;
	/** 委托人名称strid */
	client_name: number;
	/** 委托人头像 */
	client_icon: string;
	/** 委托正文strid */
	event_text: number;
	/** 选项A文本strid */
	option_text_a: number;
	/** 选项B文本strid */
	option_text_b: number;
}
//#endregion

//#region festival_ending --- group
declare interface ISheet_Activity_FestivalEnding {
	rows: ISheetData_Activity_FestivalEnding[];
	100101: ISheetData_Activity_FestivalEnding[];
	100102: ISheetData_Activity_FestivalEnding[];
	100201: ISheetData_Activity_FestivalEnding[];
	100202: ISheetData_Activity_FestivalEnding[];
	100301: ISheetData_Activity_FestivalEnding[];
	100302: ISheetData_Activity_FestivalEnding[];
	100401: ISheetData_Activity_FestivalEnding[];
	100402: ISheetData_Activity_FestivalEnding[];
	100501: ISheetData_Activity_FestivalEnding[];
	100502: ISheetData_Activity_FestivalEnding[];
	100601: ISheetData_Activity_FestivalEnding[];
	100602: ISheetData_Activity_FestivalEnding[];
	100701: ISheetData_Activity_FestivalEnding[];
	100702: ISheetData_Activity_FestivalEnding[];
	100801: ISheetData_Activity_FestivalEnding[];
	100802: ISheetData_Activity_FestivalEnding[];
	100901: ISheetData_Activity_FestivalEnding[];
	100902: ISheetData_Activity_FestivalEnding[];
	101001: ISheetData_Activity_FestivalEnding[];
	101002: ISheetData_Activity_FestivalEnding[];
	101101: ISheetData_Activity_FestivalEnding[];
	101102: ISheetData_Activity_FestivalEnding[];
	101201: ISheetData_Activity_FestivalEnding[];
	101202: ISheetData_Activity_FestivalEnding[];
	101301: ISheetData_Activity_FestivalEnding[];
	101302: ISheetData_Activity_FestivalEnding[];
	101401: ISheetData_Activity_FestivalEnding[];
	101402: ISheetData_Activity_FestivalEnding[];
	101501: ISheetData_Activity_FestivalEnding[];
	101502: ISheetData_Activity_FestivalEnding[];
	101601: ISheetData_Activity_FestivalEnding[];
	101602: ISheetData_Activity_FestivalEnding[];
	101701: ISheetData_Activity_FestivalEnding[];
	101702: ISheetData_Activity_FestivalEnding[];
	101801: ISheetData_Activity_FestivalEnding[];
	101802: ISheetData_Activity_FestivalEnding[];
	200101: ISheetData_Activity_FestivalEnding[];
	200102: ISheetData_Activity_FestivalEnding[];
	200201: ISheetData_Activity_FestivalEnding[];
	200202: ISheetData_Activity_FestivalEnding[];
	200301: ISheetData_Activity_FestivalEnding[];
	200302: ISheetData_Activity_FestivalEnding[];
	200401: ISheetData_Activity_FestivalEnding[];
	200402: ISheetData_Activity_FestivalEnding[];
	200501: ISheetData_Activity_FestivalEnding[];
	200502: ISheetData_Activity_FestivalEnding[];
	200601: ISheetData_Activity_FestivalEnding[];
	200602: ISheetData_Activity_FestivalEnding[];
	200701: ISheetData_Activity_FestivalEnding[];
	200702: ISheetData_Activity_FestivalEnding[];
	200801: ISheetData_Activity_FestivalEnding[];
	200802: ISheetData_Activity_FestivalEnding[];
	200901: ISheetData_Activity_FestivalEnding[];
	200902: ISheetData_Activity_FestivalEnding[];
	201001: ISheetData_Activity_FestivalEnding[];
	201002: ISheetData_Activity_FestivalEnding[];
	201101: ISheetData_Activity_FestivalEnding[];
	201102: ISheetData_Activity_FestivalEnding[];
	201201: ISheetData_Activity_FestivalEnding[];
	201202: ISheetData_Activity_FestivalEnding[];
	201301: ISheetData_Activity_FestivalEnding[];
	201302: ISheetData_Activity_FestivalEnding[];
	201401: ISheetData_Activity_FestivalEnding[];
	201402: ISheetData_Activity_FestivalEnding[];
	201501: ISheetData_Activity_FestivalEnding[];
	201502: ISheetData_Activity_FestivalEnding[];
	201601: ISheetData_Activity_FestivalEnding[];
	201602: ISheetData_Activity_FestivalEnding[];
	201701: ISheetData_Activity_FestivalEnding[];
	201702: ISheetData_Activity_FestivalEnding[];
	201801: ISheetData_Activity_FestivalEnding[];
	201802: ISheetData_Activity_FestivalEnding[];
	1000101: ISheetData_Activity_FestivalEnding[];
	1000102: ISheetData_Activity_FestivalEnding[];
	1000201: ISheetData_Activity_FestivalEnding[];
	1000202: ISheetData_Activity_FestivalEnding[];
	1000301: ISheetData_Activity_FestivalEnding[];
	1000302: ISheetData_Activity_FestivalEnding[];
	1000401: ISheetData_Activity_FestivalEnding[];
	1000402: ISheetData_Activity_FestivalEnding[];
	1000501: ISheetData_Activity_FestivalEnding[];
	1000502: ISheetData_Activity_FestivalEnding[];
	1000601: ISheetData_Activity_FestivalEnding[];
	1000602: ISheetData_Activity_FestivalEnding[];
	1000701: ISheetData_Activity_FestivalEnding[];
	1000702: ISheetData_Activity_FestivalEnding[];
	1000801: ISheetData_Activity_FestivalEnding[];
	1000802: ISheetData_Activity_FestivalEnding[];
	1000901: ISheetData_Activity_FestivalEnding[];
	1000902: ISheetData_Activity_FestivalEnding[];
	1001001: ISheetData_Activity_FestivalEnding[];
	1001002: ISheetData_Activity_FestivalEnding[];
	1001101: ISheetData_Activity_FestivalEnding[];
	1001102: ISheetData_Activity_FestivalEnding[];
	1001201: ISheetData_Activity_FestivalEnding[];
	1001202: ISheetData_Activity_FestivalEnding[];
	1001301: ISheetData_Activity_FestivalEnding[];
	1001302: ISheetData_Activity_FestivalEnding[];
	1001401: ISheetData_Activity_FestivalEnding[];
	1001402: ISheetData_Activity_FestivalEnding[];
	1001501: ISheetData_Activity_FestivalEnding[];
	1001502: ISheetData_Activity_FestivalEnding[];
	1001601: ISheetData_Activity_FestivalEnding[];
	1001602: ISheetData_Activity_FestivalEnding[];
	1001701: ISheetData_Activity_FestivalEnding[];
	1001702: ISheetData_Activity_FestivalEnding[];
	1001801: ISheetData_Activity_FestivalEnding[];
	1001802: ISheetData_Activity_FestivalEnding[];
	1001901: ISheetData_Activity_FestivalEnding[];
	1001902: ISheetData_Activity_FestivalEnding[];
	1002001: ISheetData_Activity_FestivalEnding[];
	1002002: ISheetData_Activity_FestivalEnding[];
	1002101: ISheetData_Activity_FestivalEnding[];
	1002102: ISheetData_Activity_FestivalEnding[];
	1002201: ISheetData_Activity_FestivalEnding[];
	1002202: ISheetData_Activity_FestivalEnding[];
	1002301: ISheetData_Activity_FestivalEnding[];
	1002302: ISheetData_Activity_FestivalEnding[];
	1002401: ISheetData_Activity_FestivalEnding[];
	1002402: ISheetData_Activity_FestivalEnding[];
	1002501: ISheetData_Activity_FestivalEnding[];
	1002502: ISheetData_Activity_FestivalEnding[];
	1002601: ISheetData_Activity_FestivalEnding[];
	1002602: ISheetData_Activity_FestivalEnding[];
	1002701: ISheetData_Activity_FestivalEnding[];
	1002702: ISheetData_Activity_FestivalEnding[];
	1002801: ISheetData_Activity_FestivalEnding[];
	1002802: ISheetData_Activity_FestivalEnding[];
	1002901: ISheetData_Activity_FestivalEnding[];
	1002902: ISheetData_Activity_FestivalEnding[];
	2000101: ISheetData_Activity_FestivalEnding[];
	2000102: ISheetData_Activity_FestivalEnding[];
	2000201: ISheetData_Activity_FestivalEnding[];
	2000202: ISheetData_Activity_FestivalEnding[];
	2000301: ISheetData_Activity_FestivalEnding[];
	2000302: ISheetData_Activity_FestivalEnding[];
	2000401: ISheetData_Activity_FestivalEnding[];
	2000402: ISheetData_Activity_FestivalEnding[];
	2000501: ISheetData_Activity_FestivalEnding[];
	2000502: ISheetData_Activity_FestivalEnding[];
	2000601: ISheetData_Activity_FestivalEnding[];
	2000602: ISheetData_Activity_FestivalEnding[];
	2000701: ISheetData_Activity_FestivalEnding[];
	2000702: ISheetData_Activity_FestivalEnding[];
	2000801: ISheetData_Activity_FestivalEnding[];
	2000802: ISheetData_Activity_FestivalEnding[];
	2000901: ISheetData_Activity_FestivalEnding[];
	2000902: ISheetData_Activity_FestivalEnding[];
	2001001: ISheetData_Activity_FestivalEnding[];
	2001002: ISheetData_Activity_FestivalEnding[];
	2001101: ISheetData_Activity_FestivalEnding[];
	2001102: ISheetData_Activity_FestivalEnding[];
	2001201: ISheetData_Activity_FestivalEnding[];
	2001202: ISheetData_Activity_FestivalEnding[];
	2001301: ISheetData_Activity_FestivalEnding[];
	2001302: ISheetData_Activity_FestivalEnding[];
	2001401: ISheetData_Activity_FestivalEnding[];
	2001402: ISheetData_Activity_FestivalEnding[];
	2001501: ISheetData_Activity_FestivalEnding[];
	2001502: ISheetData_Activity_FestivalEnding[];
	2001601: ISheetData_Activity_FestivalEnding[];
	2001602: ISheetData_Activity_FestivalEnding[];
	2001701: ISheetData_Activity_FestivalEnding[];
	2001702: ISheetData_Activity_FestivalEnding[];
	2001801: ISheetData_Activity_FestivalEnding[];
	2001802: ISheetData_Activity_FestivalEnding[];
	2001901: ISheetData_Activity_FestivalEnding[];
	2001902: ISheetData_Activity_FestivalEnding[];
	2002001: ISheetData_Activity_FestivalEnding[];
	2002002: ISheetData_Activity_FestivalEnding[];
	2002101: ISheetData_Activity_FestivalEnding[];
	2002102: ISheetData_Activity_FestivalEnding[];
	2002201: ISheetData_Activity_FestivalEnding[];
	2002202: ISheetData_Activity_FestivalEnding[];
	2002301: ISheetData_Activity_FestivalEnding[];
	2002302: ISheetData_Activity_FestivalEnding[];
	2002401: ISheetData_Activity_FestivalEnding[];
	2002402: ISheetData_Activity_FestivalEnding[];
	2002501: ISheetData_Activity_FestivalEnding[];
	2002502: ISheetData_Activity_FestivalEnding[];
}
declare interface ISheetData_Activity_FestivalEnding {
	group_id: number;
	/** 结局ID */
	ending_id: number;
	/** 结局类型 */
	ending_type: number;
	/** 权重 */
	weight: number;
	/** 增加道具 */
	item_plus: string;
	/** 减少道具 */
	item_minus: string;
	/** 庆典资金变动 */
	funds: number;
	/** 结局文本strid */
	ending_text: number;
}
//#endregion

//#region island_activity --- unique
declare interface ISheet_Activity_IslandActivity {
	rows: ISheetData_Activity_IslandActivity[];
	240601: ISheetData_Activity_IslandActivity;
}
declare interface ISheetData_Activity_IslandActivity {
	/** 活动id */
	activity_id: number;
	/** 食物id */
	food_id: number;
	/** 货币id */
	currency_id: number;
	/** 移动每格消耗食物数量 */
	food_consume: number;
	/** 收购折价百分比 */
	sell_discount: number;
	/** 引导中瓶子的市场价 */
	guide_bottle_price: number;
}
//#endregion

//#region island_goods --- group
declare interface ISheet_Activity_IslandGoods {
	rows: ISheetData_Activity_IslandGoods[];
	240601: ISheetData_Activity_IslandGoods[];
}
declare interface ISheetData_Activity_IslandGoods {
	/** 活动id */
	activity_id: number;
	/** 商品id */
	goods_id: number;
	/** 商品名 */
	goods_name: number;
	/** 矩阵（亮的部分为物品形状） */
	matrix: string;
	/** 基础价格 */
	price: number;
	/** 商品图 */
	goods_res: string;
	/** 图标 */
	icon: string;
}
//#endregion

//#region island_bag --- group
declare interface ISheet_Activity_IslandBag {
	rows: ISheetData_Activity_IslandBag[];
	240601: ISheetData_Activity_IslandBag[];
}
declare interface ISheetData_Activity_IslandBag {
	/** 活动id */
	activity_id: number;
	/** 背包id */
	bag_id: number;
	/** 背包名 */
	bag_name: number;
	/** 背包描述 */
	bag_desc: number;
	/** 背包未解锁时图标 */
	bag_icon_locked: string;
	/** 背包已解锁时图标 */
	bag_icon_unlocked: string;
	/** 背包矩阵（亮的为不可放置物品格） */
	matrix: string;
	/** 最大解锁背包矩阵 */
	max_matrix: string;
	/** 解锁背包一格消耗 */
	unlock_consume: string;
	/** 初始化时就解锁 */
	initial: number;
	/** 解锁任务id */
	unlock_task_id: number;
}
//#endregion

//#region island_map --- group
declare interface ISheet_Activity_IslandMap {
	rows: ISheetData_Activity_IslandMap[];
	240601: ISheetData_Activity_IslandMap[];
}
declare interface ISheetData_Activity_IslandMap {
	/** 活动id */
	activity_id: number;
	/** 地区id,从0开始 */
	zone_id: number;
	/** 地区名称 */
	zone_name: number;
	/** 地区已解锁时图标 */
	zone_icon_unlocked: string;
	/** 每日商人货币数量 */
	currency_amount: number;
	/** 初始化时是否解锁 */
	initial: number;
	/** 到0地区的距离 */
	distance: number[];
	/** 到0地区的路线 */
	route: string[];
	/** 解锁任务id */
	unlock_task_id: number;
}
//#endregion

//#region island_shop --- group
declare interface ISheet_Activity_IslandShop {
	rows: ISheetData_Activity_IslandShop[];
	240601: ISheetData_Activity_IslandShop[];
}
declare interface ISheetData_Activity_IslandShop {
	/** 活动id */
	activity_id: number;
	/** 活动第几日 */
	day: number;
	/** 所在地区 */
	zone_id: number;
	/** 商品id */
	goods_id: number;
	/** 商品数量 */
	count: number;
	/** 折扣百分数 */
	discount: number;
}
//#endregion

//#region island_news --- group
declare interface ISheet_Activity_IslandNews {
	rows: ISheetData_Activity_IslandNews[];
	240601: ISheetData_Activity_IslandNews[];
}
declare interface ISheetData_Activity_IslandNews {
	/** 活动id */
	activity_id: number;
	/** 第几日 */
	day: number;
	/** 第几日显示 */
	show_day: number;
	/** 新闻日期 */
	news_date: number;
	/** 新闻星期几 */
	news_week: number;
	/** 受影响地区id */
	zone: number;
	/** 新闻描述 */
	news_desc: number;
	/** 受影响商品id */
	goods_id: number;
	/** 影响百分数 */
	effect: number;
}
//#endregion

//#region summer_story --- group
declare interface ISheet_Activity_SummerStory {
	rows: ISheetData_Activity_SummerStory[];
	240811: ISheetData_Activity_SummerStory[];
}
declare interface ISheetData_Activity_SummerStory {
	/** 活动id */
	activity_id: number;
	/** 页签ID */
	id: number;
	/** 页签名 */
	story_name: number;
	/** 建筑编号 */
	building: number;
	/** 建筑名称 */
	building_name: number;
	/** 兑换建筑活动id */
	exchange_activity: number;
	/** 建筑解锁道具id */
	building_unlock: number;
	/** 剧情解锁道具 */
	story_unlock: string;
	/** 剧情id */
	story_id: string;
	/** 故事梗概 */
	story_desc: number;
	/** 角色显示，skin_id */
	show_character: string;
}
//#endregion

//#region story_activity --- group
declare interface ISheet_Activity_StoryActivity {
	rows: ISheetData_Activity_StoryActivity[];
	240811: ISheetData_Activity_StoryActivity[];
	241107: ISheetData_Activity_StoryActivity[];
	250405: ISheetData_Activity_StoryActivity[];
}
declare interface ISheetData_Activity_StoryActivity {
	/** 活动id */
	activity_id: number;
	/** 故事id */
	story_id: number;
	/** 解锁天数 */
	unlock_day: number;
	/** 解锁物品 */
	unlock_item: string;
	/** 前置故事 */
	unlock_story: string;
	/** 解锁条件（结局） */
	unlock_ending: string;
	/** 解锁需要消耗的道具 */
	unlock_consume: string;
	/** 通关奖励 */
	finish_reward: string;
	/** 全通奖励 */
	all_finish_reward: string;
	/** 交互剧情的路径 */
	content_path: string;
	/** 标题 */
	title: number;
	/** 副标题 */
	subtitle_title: number;
}
//#endregion

//#region story_ending --- group
declare interface ISheet_Activity_StoryEnding {
	rows: ISheetData_Activity_StoryEnding[];
	2504051: ISheetData_Activity_StoryEnding[];
	2504052: ISheetData_Activity_StoryEnding[];
	2504053: ISheetData_Activity_StoryEnding[];
	2504054: ISheetData_Activity_StoryEnding[];
	2504055: ISheetData_Activity_StoryEnding[];
	24081101: ISheetData_Activity_StoryEnding[];
	24081102: ISheetData_Activity_StoryEnding[];
	24081111: ISheetData_Activity_StoryEnding[];
	24081112: ISheetData_Activity_StoryEnding[];
	24081113: ISheetData_Activity_StoryEnding[];
	24081121: ISheetData_Activity_StoryEnding[];
	24081122: ISheetData_Activity_StoryEnding[];
	24081123: ISheetData_Activity_StoryEnding[];
	24081131: ISheetData_Activity_StoryEnding[];
	24081132: ISheetData_Activity_StoryEnding[];
	24081133: ISheetData_Activity_StoryEnding[];
	24081141: ISheetData_Activity_StoryEnding[];
	24081142: ISheetData_Activity_StoryEnding[];
	24081143: ISheetData_Activity_StoryEnding[];
	24110710: ISheetData_Activity_StoryEnding[];
	24110720: ISheetData_Activity_StoryEnding[];
	24110730: ISheetData_Activity_StoryEnding[];
	24110740: ISheetData_Activity_StoryEnding[];
}
declare interface ISheetData_Activity_StoryEnding {
	/** 故事id */
	story_id: number;
	/** 结局id */
	ending_id: number;
	/** 解锁天数 */
	unlock_day: number;
	/** 解锁物品 */
	unlock_item: string;
	/** 解锁条件（故事） */
	unlock_story: string;
	/** 解锁条件（结局） */
	unlock_ending: string;
	/** 解锁需要消耗的道具 */
	unlock_consume: string;
	/** 完成该结局后的奖励 */
	reward: string;
}
//#endregion

//#region activity_banner --- unique
declare interface ISheet_Activity_ActivityBanner {
	rows: ISheetData_Activity_ActivityBanner[];
	1: ISheetData_Activity_ActivityBanner;
	2: ISheetData_Activity_ActivityBanner;
	3: ISheetData_Activity_ActivityBanner;
	4: ISheetData_Activity_ActivityBanner;
	5: ISheetData_Activity_ActivityBanner;
	6: ISheetData_Activity_ActivityBanner;
	7: ISheetData_Activity_ActivityBanner;
	230143: ISheetData_Activity_ActivityBanner;
	240801: ISheetData_Activity_ActivityBanner;
	240811: ISheetData_Activity_ActivityBanner;
	240860: ISheetData_Activity_ActivityBanner;
	240901: ISheetData_Activity_ActivityBanner;
	241001: ISheetData_Activity_ActivityBanner;
	241002: ISheetData_Activity_ActivityBanner;
	241091: ISheetData_Activity_ActivityBanner;
	241101: ISheetData_Activity_ActivityBanner;
	241201: ISheetData_Activity_ActivityBanner;
	250101: ISheetData_Activity_ActivityBanner;
	250111: ISheetData_Activity_ActivityBanner;
	250201: ISheetData_Activity_ActivityBanner;
	250202: ISheetData_Activity_ActivityBanner;
	250301: ISheetData_Activity_ActivityBanner;
	250302: ISheetData_Activity_ActivityBanner;
	250391: ISheetData_Activity_ActivityBanner;
	250401: ISheetData_Activity_ActivityBanner;
	250501: ISheetData_Activity_ActivityBanner;
	250601: ISheetData_Activity_ActivityBanner;
	250701: ISheetData_Activity_ActivityBanner;
	250702: ISheetData_Activity_ActivityBanner;
	250790: ISheetData_Activity_ActivityBanner;
	250811: ISheetData_Activity_ActivityBanner;
	250820: ISheetData_Activity_ActivityBanner;
	250890: ISheetData_Activity_ActivityBanner;
	250901: ISheetData_Activity_ActivityBanner;
	250902: ISheetData_Activity_ActivityBanner;
}
declare interface ISheetData_Activity_ActivityBanner {
	/** id */
	id: number;
	/** 排序,大的在上面 */
	sort: number;
	/** 类型 */
	banner_type: number;
	/** 大厅入口 */
	enter_icon: string;
	/** 大banner */
	banner_big: string;
	/** 左banner底图 */
	banner_left: string;
	/** 左banner选中 */
	banner_left_selected: string;
	/** 左banner加图标 */
	banner_left_icon: string;
	/** 小于等于该天数时显示倒计时提示 */
	time_remind: number;
}
//#endregion

//#region activity_guide --- unique
declare interface ISheet_Activity_ActivityGuide {
	rows: ISheetData_Activity_ActivityGuide[];
	24081101: ISheetData_Activity_ActivityGuide;
	24081102: ISheetData_Activity_ActivityGuide;
	24081103: ISheetData_Activity_ActivityGuide;
	24081104: ISheetData_Activity_ActivityGuide;
	24081105: ISheetData_Activity_ActivityGuide;
	24081106: ISheetData_Activity_ActivityGuide;
	24081107: ISheetData_Activity_ActivityGuide;
	24081108: ISheetData_Activity_ActivityGuide;
	24081109: ISheetData_Activity_ActivityGuide;
	24081110: ISheetData_Activity_ActivityGuide;
	24081111: ISheetData_Activity_ActivityGuide;
	24081112: ISheetData_Activity_ActivityGuide;
	24081113: ISheetData_Activity_ActivityGuide;
	24081114: ISheetData_Activity_ActivityGuide;
	24081115: ISheetData_Activity_ActivityGuide;
	24081116: ISheetData_Activity_ActivityGuide;
	24081117: ISheetData_Activity_ActivityGuide;
	24081118: ISheetData_Activity_ActivityGuide;
	24081119: ISheetData_Activity_ActivityGuide;
}
declare interface ISheetData_Activity_ActivityGuide {
	/** 引导id */
	guide_id: number;
	/** 活动id */
	activity_id: number;
	/** 文本框位置，0下1上 */
	guide_location: number;
	/** 昵称，自定id和玩家id填0 */
	char_id: number;
	/** 指定str-event，玩家id填0 */
	char_str_id: number;
	/** 文本框内容 */
	content_str_id: number;
}
//#endregion

//#region summer_story_reward --- group
declare interface ISheet_Activity_SummerStoryReward {
	rows: ISheetData_Activity_SummerStoryReward[];
	240811: ISheetData_Activity_SummerStoryReward[];
}
declare interface ISheetData_Activity_SummerStoryReward {
	/** 活动id */
	activity_id: number;
	/** 奖励任务ID */
	period_task_id: number;
	/** 左上角建筑图显示 */
	building_icon: string;
	/** 已解锁，未完成点击提示文本 */
	click_notice: number;
}
//#endregion

//#region choose_up_activity --- unique
declare interface ISheet_Activity_ChooseUpActivity {
	rows: ISheetData_Activity_ChooseUpActivity[];
	250125: ISheetData_Activity_ChooseUpActivity;
}
declare interface ISheetData_Activity_ChooseUpActivity {
	/** 活动id */
	activity_id: number;
	/** choose_up_replace.id */
	replace_id: number;
	/** 可选卡池,国女 */
	base_chest_id: number[];
	/** 可选类型 */
	choose_type: string[];
	/** 卡池排序大的靠上 */
	sort: number;
	/** 卡池短名 */
	title_str_id: number;
	/** 卡池说明文，高亮用[tag]区分[/tag] */
	str_id: string;
	/** 角色出率文本 */
	chara_str_id: number;
	/** 装扮出率文本 */
	item_str_id: number;
	/** 宣传图 */
	img: string;
	/** 卡池标题图 */
	title_img: string;
	/** 卡池标题图2（左下的） */
	title_img_2: string;
	/** 排版种类0常规 1普通轮换 2UR角色 3联动  4自选 */
	typeset: number;
	/** 进入动画 */
	enter_animation: string;
	/** 特效前 */
	special_effect_front: string;
	/** 特效后，常驻，特效替换樱花特效 */
	special_effect_back: string;
	/** audio表内音效 */
	special_audio: number;
	/** 0=无up装扮，1=新装扮，2=特定老装扮，3=常驻装扮 */
	up_items_type: number;
	/** UP的物品 */
	up_items: number[];
}
//#endregion

//#region choose_up_replace --- group
declare interface ISheet_Activity_ChooseUpReplace {
	rows: ISheetData_Activity_ChooseUpReplace[];
	1001: ISheetData_Activity_ChooseUpReplace[];
	1002: ISheetData_Activity_ChooseUpReplace[];
}
declare interface ISheetData_Activity_ChooseUpReplace {
	/** 替换选择组id */
	id: number;
	/** 卡池id,国 */
	chest_id: number[];
	/** chest.item_pool.id（索引） */
	item_pool_id: number;
	/** 替换权重（结果） */
	weight: number;
	worth: number;
}
//#endregion

//#region progress_reward --- group
declare interface ISheet_Activity_ProgressReward {
	rows: ISheetData_Activity_ProgressReward[];
	250895: ISheetData_Activity_ProgressReward[];
}
declare interface ISheetData_Activity_ProgressReward {
	/** 活动id */
	activity_id: number;
	/** 到达进度的时间 */
	progress_time: string;
	/** 进度（百分数*100） */
	progress: number;
	/** 奖励 */
	reward: string;
}
//#endregion