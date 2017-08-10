
export const DATASET = {

  "tags" : {

    "internet"  : "Phone/Internet/Mobile",
    "health"    : "Gym/Drugstore"

  },

  "categories" : {

    "car"         : "Car",
    "lunch-duh"   : "Lunch Duh",
    "drugstore"   : "DrugStore",
    "home"        : "home",
    "her-stuff"   : "Wife's stuff",
    "misc"        : "Misc",
    "wage"        : "Wage",
    "invest"      : "Investiment"

  },

  "accounts": {

    "ccard-0": {
      "kind": "credit-card",
      "description": "ccard-0",
      "dueDate": 15
    },

    "my-account": {
      "kind": "current-account",
      "description": "My Bank"
    },

    "ccard-1": {
      "kind": "credit-card",
      "description": "Master Duh",
      "dueDate": 10
    },

    "her-account": {
      "kind": "saving-account",
      "description": "Saving Account - Wife"
    },


  },
  "transactions": {

    "2017-08": [

      {"description" : "Airplane ticket 10/10",       "day" : 3,  "value" : 171.17, "target" : "ccard-0",     "category" : "home"},
      {"description" : "Gym 4/12",                    "day" : 3,  "value" : 194.80, "target" : "ccard-0",     "category" : "misc"},
      {"description" : "Hairdressing stuff ",         "day" : 5,  "value" : 70.0,   "target" : "ccard-0",     "category" : "her-stuff"},

      {"description" : "Cable TV",                    "day" : 25, "value" : 277.68, "target" : "my-account",  "category": "home", "tags" : ["internet"]},
      {"description" : "Internet",                    "day" : 15, "value" : 94.90,  "target" : "my-account",  "category": "home", "tags" : ["internet"]},

      {"description" : "Mobile (prepaid)",            "day" : 10, "value" : 75,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},
      {"description" : "Phone (landline)",            "day" : 10, "value" : 56,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},
      {"description" : "Streaming flix",              "day" : 15, "value" : 27,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},

      {"description" : "Rent",                        "day" : 15, "value" : 570.00, "target" : "my-account",  "category": "home"},
      {"description" : "Monthly Beer Subscription",   "day" : 10, "value" : 420.00, "target" : "my-account",  "category": "misc", "self-renew": true},

      {"description" : "Spa Nail Salon",              "day" : 10, "value" : 197.00, "target" : "ccard-1",     "category" : "her-stuff"},

      {"description" : "Monthly wage Duh",            "day" : 7,  "value" : 2000.0, "target" : "my-account",  "category" : "wage", "self-renew": true, "credit" : true},
      {"description" : "Monthly wage Wife",           "day" : 10, "value" : 1900.0, "target" : "her-account", "category" : "wage", "self-renew": true, "credit" : true},
      {"description" : "Mom's allowance",             "day" : 1,  "value" : 500.0,  "target" : "her-account", "category" : "invest", "credit" : true},

      {"description": "Car repair (1/4)",             "day" : 22, "value" : 850.0,  "target" : "her-account", "category" : "car"}

      // ∑(tag = internet) = 530.68
    ],

    "2017-09": [

      {"description" : "Gym 5/12",                    "day" : 3,  "value" : 194.80, "target" : "ccard-0",     "category" : "misc"},

      {"description" : "Cable TV",                    "day" : 25, "value" : 99.50,  "target" : "my-account",  "category": "home", "tags" : ["internet"]},
      {"description" : "Internet",                    "day" : 15, "value" : 94.90,  "target" : "my-account",  "category": "home", "tags" : ["internet"]},

      {"description" : "Mobile (prepaid)",            "day" : 10, "value" : 75,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},
      {"description" : "Phone (landline)",            "day" : 10, "value" : 56,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},
      {"description" : "Streaming flix",              "day" : 15, "value" : 27,     "target" : "my-account",  "category": "home", "self-renew": true, "tags" : ["internet"]},

      {"description" : "Rent",                        "day" : 15, "value" : 570.00, "target" : "my-account",  "category": "home"},
      {"description" : "Monthly Beer Subscription",   "day" : 10, "value" : 420.00, "target" : "my-account",  "category": "misc", "self-renew": true},

      {"description" : "Monthly wage Duh",            "day" : 7,  "value" : 2000.0, "target" : "my-account",  "category" : "wage", "self-renew": true, "credit" : true},
      {"description" : "Monthly wage Wife",           "day" : 10, "value" : 1900.0, "target" : "her-account", "category" : "wage", "self-renew": true, "credit" : true},
      {"description" : "Mom's allowance",             "day" : 1,  "value" : 500.0,  "target" : "her-account", "category" : "invest", "credit" : true},

      {"description": "Car repair (2/4)",             "day" : 22, "value" : 850.0,  "target" : "her-account", "category" : "car"}

      // ∑(tag = internet) = 352.40
    ]

  }

}


