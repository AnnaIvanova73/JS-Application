/*Къде да сложим await
Await -> ще спре изпълнението на кода и всичко след await-та дори другите await-и докато първия хитнат await
или не се резолвне или не хвърли грешка.
Как го прави чисто практически? Await казва направи ми нов промис и в този промис или условие може да го наречем ->
new Promise(if(result1.resolve) =>) и когато всичко е резолвнато/условите е спазено,
целия execution context се взема и казва пушни ми вече останалото от call stack-a да се изпълни и то

let result1 =  execute(1, 1); -> result1 е промис, който е pending, но ако
let result1 = await execute(2, 2); -> има await отпред, await-та ще ънрапне промиса, при ънрапването result1 е истинското value/data/стойност
Промиса може да се разглежда, като някакъв wrapper той държе или exception или
някакъв резултат.

Ерори ==>  ако един промис троуне се хвърля специфичен error rejected,
малко по-добре е,
ако една асинхронна функции хвърли ексепшън, ексепшъна се ънрапва и имаме по-четим еррор, за да знаем какво става и дава възможност,
да се държи като синхронен код, който е гръмнал, поради което можем да си обградим с try/catch както си е нормално
 */

function execute(x, sec) {
    return new Promise(resolve => {
        //throw new Error('my error');
        console.log(`Start: ` + x);
        setTimeout(() => {
            console.log(`End: ` + x);
            resolve(x);
        }, sec * 100)
    })
}

async function serialFlow() {
    //Не коректно използване на await 1
    let result1 = await execute(1, 1);//2 секунди//кода спира тук, ще спира на всеки await и ще чака да се изпълни
    let result2 = await execute(2, 2);//2 секунди след първите 2 секунди
    let result3 = await execute(3, 3);//2 секунди след първите по 2 секунди
    let finalResult = result1 + result2 + result3;
    console.log(finalResult);
}

async function parallelFlow() {
    //Не коректно използване на await 2
    let result1 = execute(1, 1);
    let result2 = execute(2, 2);
    let result3 = execute(3, 3);
    let finalResult = await result1 + await result2 + await result3; //защо е по-добре? резултите, които нямат await са тръгнали да се изпълняват
    //в момент, в който ударим await резулт 1, нещата са по-добре, защото останалия код до хитването на await може даже да е изчислен на тази фаза
    //блока който се сформира има вероятност да се изпълни по-лесно, но пак имаме процес, които прави една операции многократно
    console.log(finalResult);
}

async function parallelFlowPromiseAll() {
    //Коректно използване на await
    let result1 = execute(1, 1);
    let result2 = execute(2, 2);
    let result3 = execute(3, 3);
    let finalResult = await Promise.all([result1, result2, result3]);
    console.log(finalResult);
}

function outer() {
    console.log(`outer 1`);
}

console.log('here');
outer(); // кода не продължава преди да си изпълним Outer при await е същото
console.log(`end`);
console.log(`end`);