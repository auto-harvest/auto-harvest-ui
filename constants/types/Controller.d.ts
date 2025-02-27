import { CropType } from "../enums/CropType.enum";
import { SystemStatus } from "../enums/SystemStatus.enum";
import { WaterLevel } from "../enums/WaterLevel.enum";
import { BaseEntity } from "./_BaseEntity";

export interface IController extends BaseEntity {
  code: string;
  waterLevel: WaterLevel;
  systemStatus: SystemStatus;
  cropType: CropType;
}

export class Controller implements IController {
  constructor() {
    this.id = "";
    this.code = "";
    this.waterLevel = WaterLevel.Low;
    this.systemStatus = SystemStatus.Offline;
    this.cropType = CropType.None;
  }

  constructor(
    public id: string,
    public code: string,
    public waterLevel: WaterLevel,
    public systemStatus: SystemStatus,
    public cropType: CropType
  ) {
    this.id = id;
    this.code = code;
    this.waterLevel = waterLevel;
    this.systemStatus = systemStatus;
    this.cropType = cropType;
  }
}
