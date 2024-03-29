import { databaseId, notion } from '../config/notion.js';
import { blue } from '../util/color-text.js';
import { allListsCommand, errorCommand } from '../util/command.js';
import { dateNow } from '../util/date.js';
import { idGenerator } from '../util/idGenerator.js';


//FIND TODO BY ID
export async function queryDatabase(id) {
  try {
      const response = await notion.databases.query({
          database_id: databaseId,
          "filter": {
              "property": "ID",
              "rich_text": {
                  "contains": id
              }
          }
        });  
      return response.results[0].id;
  } catch (error){
    //   console.log(error.body);
  }
}
//FIND ALL TODO
export async function getAllDatabase() {
  try {
      const response = await notion.databases.query({
          database_id: databaseId
        });  
      return response
  } catch (error){
      console.log(error.body);
  }
}
//TODO LIST
export async function getTodoLists() {
  try {
      const { results } = await getAllDatabase()
      results.forEach(result => {
          const data = result.properties
          const id = data.ID.title[0].plain_text
          const status = data.Status.checkbox ? 'X' : ''
          const name = data.Name.rich_text[0].plain_text
          allListsCommand(id,status, name)
      })
  } catch (error){
      console.log(error.body);
  }
}


//CREATE TODO
export async function addToDatabase(name) {
  try {
    if(name.length < 3) {
        errorCommand('add', 'Name length must above 2')
        return
    }
      const response = await notion.pages.create({
          parent: {
              database_id: databaseId,
          },
          properties: {
              'ID': {
                  type: 'title',
                  title: [
                  {
                      type: 'text',
                      text: {
                          content: idGenerator(),
                      },
                  },
                  ],
              },
              'Name' : {
                      type: 'rich_text',
                      rich_text: [
                      {
                          type: 'text',
                          text: {
                              content: name,
                          },
                      }
                      ],
              },
              'Status': {
                  type: 'checkbox',
                  checkbox: false
              },
              'Date': { 
                  type: 'date',
                  date: {
                      "start": dateNow()
                  }
              },
          }    
      });
      // console.log(response);
    //   getTodoLists()
      blue(`${name} Added to your TODO`)
  } catch (error) {
      console.error(error.body);
  }
}

//UPDATE TODO
export async function updateItem(status, id) {    
          try {
              const { results } = await getAllDatabase()
              let tempPageId
              const pageId = await queryDatabase(id)

              if(!pageId) throw ({name : 'NotFound'})
    
              results.forEach(val => {
                  const MAUNOTION_ID = val.properties.ID.title[0].plain_text
                  if(MAUNOTION_ID.split('-')[1].slice(0,3) === id) tempPageId = pageId
              })
              
              const response = await notion.pages.update({
                  page_id: pageId || tempPageId,
                  properties: {
                      'Status': {
                          checkbox: status,
                      },
                      'Date': { 
                          type: 'date',
                          date: {
                              "start": dateNow()
                          }
                      },
                  },
                  });
                  blue(`Task with id ${id} checked!`)
          } catch (e) {
            if(e.name === 'NotFound') errorCommand('done', 'Id not found!')
          }
}

//DELETE TODO BY ID
export async function deleteItem(id) {    
  try {
      const { results } = await getAllDatabase()
      let tempPageId
      const pageId = await queryDatabase(id)

      if(!pageId) {
        throw ({name : 'NotFound'})
      }

      results.forEach(val => {
          const MAUNOTION_ID = val.properties.ID.title[0].plain_text
          if(MAUNOTION_ID.split('-')[1].slice(0,3) === id) tempPageId = pageId
      })

      await notion.blocks.delete({
          block_id: pageId,
      });
      blue(`${id} Deleted!!`)
  } catch (e) {
      if(e.name === 'NotFound') errorCommand('delete', 'Id not found!')
  }
}



