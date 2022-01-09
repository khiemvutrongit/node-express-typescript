import { FilterQuery } from "mongoose";
import { Request } from "express";

interface IQueryExtractor {
  key: string;
  condition: string;
  value: string;
}

const operators = [
  'like',
  'eq',
  'gt',
  'gte',
  'lt',
  'lte',
  'ne',
  'nin'
];

function getCondition(parameter: string) {
  for (const condition of operators) {
    const conditionStr = `%${condition}%`
    if (parameter.includes(conditionStr)) {
      return condition;
    }
  }
  return "";
}

function isValidQueryParam(parameter: string) {
  if (!parameter || typeof parameter !== 'string') {
    return false;
  }

  for (const operator of operators) {
    if (parameter.includes(`%${operator}%`)) {
      return true;
    }
  }

  return false;
}

function queryExtractor(parameter: string) {
  const result: IQueryExtractor = {
    key: "",
    condition: "",
    value: ""
  }

  if (!parameter || typeof parameter !== 'string') {
    return result;
  }

  if (isValidQueryParam(parameter)) {
    result.condition = getCondition(parameter);
    const virtualCondition = `%${result.condition}%`;
    const indexCondition = parameter.indexOf(virtualCondition);
    
    result.key = parameter.substring(0, indexCondition);
    result.value = parameter.substring(indexCondition + virtualCondition.length, parameter.length);
  }

  return result;
}

export const parserQuery = (req: Request): FilterQuery<any> => {
  try {
    const {
      query
    } = req.query;

    if (query && typeof query === 'string') {
      query.split(',').reduce((object: FilterQuery<any>, cur) => {
        const {
          key,
          condition,
          value
        } = queryExtractor(cur);
        /**
         * converting value from string to expected type
         * @param {String} inputValue Input value
         * @returns {String|Number|null} String | 10 | null
         */
        const convertValue = (inputValue: string | number | null) => {
          if (inputValue && typeof inputValue == "string" && !inputValue.length) {
            // if value is ''
            return null;
          } else if (inputValue && typeof inputValue == "string" && !isNaN(Number(inputValue))) {
            // if value like '10'
            return Number(inputValue);
          } else {
            // if value like 'string'
            return decodeURIComponent(`${inputValue}`).trim();
          }
        };

        switch(condition) {
          case "like":
            object[key]["$regex"] = new RegExp(value, 'i');
            break;
          case "nin":
          case "in":
            object[key][condition] = value.split('|').map(convertValue);
          case "eq":
          case "ne":
          case "gt":
          case "gte":
          case "lt":
          case "lte":
            object[key][condition] = convertValue(value);
            break;
          default:
            break;
        }

        return object;
      }, {});
    }
  return
  } catch (error) {}
}