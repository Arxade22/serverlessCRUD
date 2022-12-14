const AWS = require('aws-sdk');

const updateTask = async (event) => {
    const dynamodb =  new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters; 
    const {done,title,description} = JSON.parse(event.body)

    await dynamodb.update({
        TableName: 'TaskTable',
        Key: {id},
        UpdateExpression: 'set actualizado = :done , titulo = :title , descripcion = :description',
        ExpressionAttributeValues:{
            ":done":done,
            ":title":title,
            ":description":description,
        },
        ReturnValues: "ALL_NEW",

    }).promise()

    return {
        status : 200 ,
        body : JSON.stringify({
            message: "Task Updated successfully",
        })
    }


};

module.exports = {
    updateTask 
};