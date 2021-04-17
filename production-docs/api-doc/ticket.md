
  
# Theatre Ticket APIs

**Description:** Describe the theatre tickets management and its analytics

## INDEX

[Model Schema](#schema)

[Create New Ticket](#post-apitickets)

[Get Ticket](#get-apitickets)

[Get Ticket Count](#get-apiticketscount)

[Get Ticket By Ticket Id](#get-apiticketsid)

[Delete Ticket By Ticket Id](#delete-apiticketsid)

[Update Ticket By Ticket Id](#put-apiticketsid)

[Get Earned Profit Analytics](#get-apiticketsanalyticsearned)

[Get  Visited People Analytics](#get-apiticketsanalyticsvisited)

## Schema

| Property | Datatype | Description | Constrains |
|--|--|--|--|
| id | string | id of domain | - |
| creationDate | date | timestamp of the ticket being created or generated |- |
| customerName | string |  name of the customer | - |
| performanceTitle | string | name of the performance played | - |
| performanceTime | string | timestamp of the performance conducted | - |
| ticketPrice | number | price of the ticket | - |
| created | date | document created timestamp in the database | - |
| lastUpdated | date | document last updated timestamp in the databas | - |

## POST /api/tickets

**Description:** Create new Ticket 

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |

**Payload**

|Type |required |
|--|--|
|id| No |
| creationDate | Yes | 
| customerName| Yes |
| performanceTitle | Yes |
| performanceTime| Yes |
| ticketPrice | Yes |
| created| No |
| lastUpdated| No |

**Sample Payload:**

```
{
  "creationDate": "2021-04-16T13:20:15.048Z",
  "customerName": "Kalyani Kolimali",
  "performanceTitle": "Dance Performance",
  "performanceTime": "2021-04-16T13:20:15.048Z",
  "ticketPrice": 600
}
```

**Response**

**200** : Request was successful

```
{
    "id": "60799981b5b4ed68d8cebf31",
    "creationDate": "2021-04-16T13:20:15.048Z",
    "customerName": "Kalyani Kolimali",
    "performanceTitle": "Dance Performance",
    "performanceTime": "2021-04-16T13:20:15.048Z",
    "ticketPrice": 600,
    "created": "2021-04-16T14:04:49.195Z",
    "lastUpdated": "2021-04-16T14:04:49.195Z"
}
```

**422** : Unprocessable Entity

```
{
    "error": {
        "statusCode": 422,
        "name": "ValidationError",
        "message": "The `Ticket` instance is not valid. Details: `creationDate` can't be blank (value: undefined).",
        "details": {
            "context": "Ticket",
            "codes": {
                "creationDate": [
                    "presence"
                ]
            },
            "messages": {
                "creationDate": [
                    "can't be blank"
                ]
            }
        }
    }
}
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## GET /api/tickets

**Description:** Get all tickets

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |
  
**Response**

**200**: Request was successful

```
[
  {
    "id": "60799981b5b4ed68d8cebf31",
    "creationDate": "2021-04-16T13:20:15.048Z",
    "customerName": "Kalyani Kolimali",
    "performanceTitle": "Dance Performance",
    "performanceTime": "2021-04-16T13:20:15.048Z",
    "ticketPrice": 600,
    "created": "2021-04-16T14:04:49.195Z",
    "lastUpdated": "2021-04-16T14:04:49.195Z"
  }
]
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## GET /api/tickets/count

**Description:** Get Tickets Count

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |
| Query | filter | where filter | `{"where": {"name": "xxxx"}}` |No

**Response**

**200**: Request was successful

```
{
"count": "4"
}
```

**400** : Bad Request

```
{
  "error": {
    "statusCode": 400,
    "name": "Error",
    "message": "Value is not an object."
  }
}
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## GET /api/tickets/{id}

**Description:** Get Ticket by Ticket id

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |

**Response**

**200**:Request was successful

```
{
  "id": "60799981b5b4ed68d8cebf31",
  "creationDate": "2021-04-16T13:20:15.048Z",
  "customerName": "Kalyani Kolimali",
  "performanceTitle": "Dance Performance",
  "performanceTime": "2021-04-16T13:20:15.048Z",
  "ticketPrice": 600,
  "created": "2021-04-16T14:04:49.195Z",
  "lastUpdated": "2021-04-16T14:04:49.195Z"
}
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**404** : Not Found

```
{
  "error": {
    "statusCode": 404,
    "name": "Error",
    "message": "Unknown \"Ticket\" id \"60799981b5b4ed68d8cebf31q\".",
    "code": "MODEL_NOT_FOUND"
  }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## DELETE /api/tickets/{id}

**Description:** Delete Domain by Domain id

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |

**Response**

**200**: Request was successful

```
{
"count": "1"
}
```

**401**: Unauthorized
```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## PUT /api/domains/{id}

**Description:** Update Domain by Domain id

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken| constant string | xxxx | `yes` |
| path| id| Yes| id of Domain| `xxxxxxxxxxxxxxxxxx` |Yes

**Payload**

|Type |required |
|--|--|
|id| No |
| creationDate | Yes | 
| customerName| Yes |
| performanceTitle | Yes |
| performanceTime| Yes |
| ticketPrice | Yes |
| created| No |
| lastUpdated| No |

**Sample Payload:**

```
{
  "customerName": "Kalyani Kolimali",
  "performanceTitle": "Dance Performance" 
}
```
  
**Response**

**200**: Request was successful

```
{
  "id": "60799981b5b4ed68d8cebf31",
  "creationDate": "2021-04-16T13:20:15.048Z",
  "customerName": "Kalyani Kolimali",
  "performanceTitle": "Dance Performance",
  "performanceTime": "2021-04-16T13:20:15.048Z",
  "ticketPrice": 600,
  "created": "2021-04-16T14:04:49.195Z",
  "lastUpdated": "2021-04-16T14:04:49.195Z"
}
```


**422** : Unprocessable Entity

```
{
    "error": {
        "statusCode": 422,
        "name": "ValidationError",
        "message": "The `Ticket` instance is not valid. Details: `creationDate` can't be blank (value: undefined).",
        "details": {
            "context": "Ticket",
            "codes": {
                "creationDate": [
                    "presence"
                ]
            },
            "messages": {
                "creationDate": [
                    "can't be blank"
                ]
            }
        }
    }
}
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## GET /api/tickets/analytics/earned

**Description:** Get the analytics of how much money was earned by the theatre between 2 dates division by months, Year.

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken|  constant string | xxxx | `yes` |
| query params| method| constant string | JSaggregation/DBaggregation | `yes` |
| query params| startDate| date | 2021-03-04 | `yes` |
| query params| endDate| date | 2021-04-16 | `yes` |

**Response**

**200**: Request was successful

```
[
  {
    "month": "March 2021",
    "summaryProfit": 1050
  },
  {
    "month": "April 2021",
    "summaryProfit": 1350
  }
]
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**400**: Bad Request

```
{
    "error": {
        "statusCode": 400,
        "name": "Error",
        "message": "invalid method request"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```

## GET /api/tickets/analytics/visited

**Description:** Get the analytics of how many people visited by the theatre between 2 dates division by months, Year.

**Authentication:** Required

**Authorization:**  A constant key agreed upon both server and client side applications.

**Parameters**

| Type | Name | Description | Example | Required |
|--|--|--|--|--|
| Headers| authToken|  constant string | xxxx | `yes` |
| query params| method| constant string | JSaggregation/DBaggregation | `yes` |
| query params| startDate| date | 2021-03-04 | `yes` |
| query params| endDate| date | 2021-04-16 | `yes` |

**Response**

**200**: Request was successful

```
[
  {
    "month": "March 2021",
    "summaryVisit": 3
  },
  {
    "month": "April 2021",
    "summaryVisit": 3
  }
]
```

**401**: Unauthorized

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "authToken is required"
    }
}
```

```
{
    "error": {
        "statusCode": 401,
        "name": "Error",
        "message": "unauthorized"
    }
}
```

**400**: Bad Request

```
{
    "error": {
        "statusCode": 400,
        "name": "Error",
        "message": "invalid method request"
    }
}
```

**500**: Internal Server Error

```
{
	"error": {
		"statusCode": 500,
		"message": "Internal Server Error"
	}
}
```