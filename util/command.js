export const listCommand = `
list : Login your Notion account
add : Add your ToDo to Notion Account`

export const allListsCommand = (id, status, name) => {
console.log(`
ID : ${id}
Checkbox : [${status}]
Name : ${name}
`);
}