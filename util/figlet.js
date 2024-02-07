import figlet from 'figlet'

export const f = async(t) => {
    const data = await figlet(t)
    console.info(data)
}