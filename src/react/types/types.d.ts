import { RuleOperatorEnum } from "../enums/enums";

export type StorageObject = {
  ruleName: string;
  ruleOperator: RuleOperatorEnum;
  fromUrl: string;
  toUrl: string;
  enabled: boolean;
};
