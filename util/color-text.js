import chalk from 'chalk'

export const blue = (t) => {
    setTimeout(() => {
        console.info(chalk.blue(t))
    }, 1000)
    
    
}

export const cyan = (t) => {
    console.info(chalk.cyan(t))
}