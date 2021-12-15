type PetType = 'girassol'|'lirio'|'suculenta'|'orquideas';

type Pet ={
    type:PetType,
    image:string,
    name:string,
    price:string
}

const data:Pet[] = [
    {
        type:'girassol',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-1815-0.webp',
        name:'Girassol Ilha',
        price:'R$ 120'
    },
    {
        type:'girassol',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-1116-0.webp',
        name:'Girassol Noticia',
        price:'R$ 70'
    },
    {
        type:'girassol',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-2602-1.webp',
        name:'Girassol Simples',
        price:'R$ 30'
    },
    {
        type:'lirio',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-2740-1.webp',
        name:'Lirio de Hastes Brancas',
        price:'R$ 150'
    },
    {
        type:'lirio',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-1048-1.webp',
        name:'Lirio do campo Colorida',
        price:'R$ 230'
    },
    {
        type:'lirio',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-2629-0.webp',
        name:'Lirio Sem Razão',
        price:'R$ 340'
    },
    {
        type:'suculenta',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-1811-0.webp',
        name:'Mini Deserto',
        price:'R$ 50'
    },
    {
        type:'suculenta',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-5149-0.webp',
        name:'Mini Suculenta',
        price:'R$ 40'
    },
    {
        type:'orquideas',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-5645-0.webp',
        name:'Mil Palavras',
        price:'R$ 300'
    },
    {
        type:'orquideas',
        image:'https://www.floresonline.com.br/media/catalog/product/a/l/alta-05769_1.webp',
        name:'Romance rosado',
        price:'R$ 240'
    },
]

export const Pet = {
    getAll:():Pet[] => {
        return data;
    },
};