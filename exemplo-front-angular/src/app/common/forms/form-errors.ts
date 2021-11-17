import { InjectionToken } from '@angular/core';
import {CoreUtils} from "../../../core/utils/CoreUtils";


export const defaultErrors = {
  required: (error) => `Campo Obrigatório.`,
  minlength: ({ requiredLength, actualLength }) => `MIn Length Expect ${requiredLength} but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) => `MaxLength Expect ${requiredLength} but got ${actualLength}`,
  max: ({ max }) => `Valor máximo  permitido: ${CoreUtils.getFormattedPrice(parseFloat(max))}`,
  min: ({ min }) => `Valor mínimo  permitido: ${CoreUtils.getFormattedPrice(parseFloat(min))}`,
  mask: (error) => `Formato Inválido.`,
  cpfNotValid: (error) => `CPF Inválido.`,
  email: (error) => `E-mail inválido.`,
  minPercent:  ({ min }) => `Mínimo  permitido: ${CoreUtils.getFormattedPercent(min)}`,
  maxPercent:  ({ max }) => `Máximo  permitido: ${CoreUtils.getFormattedPercent(max)}`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
      providedIn: 'root',
        factory: () => defaultErrors
});
