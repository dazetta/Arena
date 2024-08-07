export const CONFIG = {
  BASE_URL: "https://script.google.com/macros/s/AKfycbxwlzhHZBtunhhnFX-IROQ9vIPd0EGUhqRpMATMGoAvk-j_7Lloan1iFH4hpnsz-Sor/exec",
  GET_PRODUCTS: "?action=get&type=products",
  GET_CATEGORIES: "?action=get&type=categories",
  CREATE_ORDER: "?action=post&type=order",
  GET_APP_DATA: "?action=get&type=app_data",
  GET_USER_ORDER: "?action=get&type=user_orders&userid=",
  GET_USER_OFFERS: "?action=get&type=user_offers&userid=",
  VALIDATE_USER: "?action=get&type=validate_user",
  REGISTER_USER: "?action=post&type=register",
  appDataFallback: true,
  offerDataFallback: true,
  exceptionError: "Error, please try again later."
};
