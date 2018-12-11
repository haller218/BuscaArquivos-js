'use stricts'

const fs = require("fs")

// regex de busca principal
const reg = /23[\s\t\.\-]?595[\s\t\.\-]?762[\s\t\.\-]?/

let recursiveSearchFileByPath = (path) => {

    path = path.replace(/^/, './')

    let dll = /^.*.dll$/

    let count = 0

    let files = []

    let flag = false

    let lines = 0

    let superArray = []

    fs.readFileSync(path)
        .toString()
        .split('\n')
        .forEach(r => {
            lines++
            if (r.match(reg) && !(r.match(dll))) {

                filepath = (fs.realpathSync(path).replace(/\\/g, "\/"))
                files.push({ path: filepath, lines: lines });
                superArray.push({ "Arquivo": filepath });
                superArray.push({ "Encontrado": r.match(reg)[0] })
                superArray.push({ "Linhas": lines })
                superArray.push({ "Linha": r.match(reg).input.substring(0, 160) })
                // files[filepath] = lines
                flag = true
                count++
            }
        })

    if (flag) {

        superArray.push(count);
        superArray.push(files);
        return superArray
    }


}

let searchDirectoryRecursive = (pathroot) => {

    pathroot = pathroot.replace(/^/, './')

    func = pah => {
        fs.readdirSync(pah)
            .map(r => {

                // mostra o caminho de todos os arquivos
                // console.log(fs.realpathSync(pah+"/"+r));

                if ((fs.statSync(pah + "/" + r)).isDirectory())
                    func(pah + "/" + r)
                else {
                    if ((fs.statSync(pah + "/" + r)).isFile()) {

                        let result = recursiveSearchFileByPath(pah + "/" + r)
                        if (!!result)
                            console.log(result)
                    }
                }
            })
    }

    func(pathroot)
}

let main = () => {

    if (!!global.process.argv[2])
        searchDirectoryRecursive(global.process.argv[2])
    else
        searchDirectoryRecursive(".")
    console.log("");
    console.log("Fim");
    return 0
}

main()