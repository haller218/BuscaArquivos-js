'use stricts'

const fs = require("fs")

// regex de busca principal
const reg = /10\.85\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
// const reg = /23[\s\t\.\-]?595[\s\t\.\-]?762[\s\t\.\-]?/
const MAX_BUFFER = 100

let superArrayty = []

const saveFileString = ( filenamepath, stringFile ) => {

    return new Promise ( ( rest, errt ) => {

	fs.writeFile ( filenamepath, stringFile, 'utf8', err => {
	    if ( err ) 
		throw err

	    rest ( true )
	} )
    } )
}

const genStringCSV = arry => {

    let ArrToString = ''

    arry.forEach( line => ArrToString += line )

    return ArrToString
}

const gencsvArry = _ => {

    const genStringLinha = ( Arquivo, Encontrado, Linhas, Linha ) => {

	const separa = ';'

	const inicioLinha = ''
	
	const finalLinha = '\n'

	let stringa = inicioLinha + Arquivo + separa + Encontrado + separa + Linhas + separa + Linha + finalLinha

	return stringa
    }

 
    let lineCabecalho = genStringLinha ( "Arquivo", "Encontrado", "Linhas", "Linha" )

    let fileArr = []

    thing = ''

    fileArr.push ( lineCabecalho )

    superArrayty.forEach ( r => {

	r.forEach( ii => {

	    fileArr.push ( genStringLinha ( ii[0], ii[1], ii[2], ii[3].replace(';',':') ) )
	} )
    } )
    
    return fileArr
}

const genCSVFile = fileName => {

    return new Promise (( res, err) => {
	
	csvArray = gencsvArry (  )

	stringsg = genStringCSV ( csvArray )
	
	console.log(fileName)
	saveFileString ( fileName, stringsg ) 

	res("Save! CSV" )
    })
}


let recursiveSearchFileByPath = path => {

    path = path.replace(/^/, './')

    let dll = /^.*.dll$/

    let flag = false

    let lines = 0

    let superArray = []

    if ( fs.readFileSync(path).length < 10000000 ) {

	fs.readFileSync(path)
            .toString()
            .split('\n')
            .forEach(r => {
		lines++
		if (r.match(reg) && !(r.match(dll))) {

                    filepath = (fs.realpathSync(path).replace(/\\/g, "\/"))

		    console.log ( filepath )

		    let ins = []
		    
                    ins.push(filepath);
                    ins.push(r.match(reg)[0])
                    ins.push(lines)
                    ins.push(r.match(reg).input.substring(0, 160))

		    superArray.push(ins)
                    // files[filepath] = lines
                    flag = true
		}
            } )
	
	if ( flag ) {

	    // console.log(superArray)
            return superArray
	}
    }
}

let searchDirectoryRecursive = (pathroot, pathsave) => {

    pathroot = pathroot.replace(/^/, './')

    let count = 0

    func = pah => {
        fs.readdirSync(pah)
            .forEach( r => {

                // mostra o caminho de todos os arquivos
                // console.log(fs.realpathSync(pah+"/"+r));

                if ((fs.statSync(pah + "/" + r)).isDirectory())
                    func(pah + "/" + r)
                else {
                    if ((fs.statSync(pah + "/" + r)).isFile()) {

                        let result = recursiveSearchFileByPath(pah + "/" + r)
                        if (!!result) {
                            superArrayty.push(result)

			    if (count == MAX_BUFFER) {

				again = genCSVFile( pathsave )

				console.log(again)
				
				count = 0
			    }

			    count = count + 1
			}
                    }
                }
            } )
    }
    
    func(pathroot)

    again = genCSVFile ( pathsave )
    console.log(again)
}

let main = () => {


    let fileread = global.process.argv[2]
    let fileout = global.process.argv[3]
    
    if (!!fileread)
        searchDirectoryRecursive(fileread, fileout)
    else
        searchDirectoryRecursive(".", fileout)
    console.log("");
    console.log("Fim");
    return 0
}

main()
