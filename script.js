const make_collection_header = (day_name) => {
    const collection_header = document.createElement('h2')
    collection_header.setAttribute('class', 'collection_header')
    collection_header.textContent=day_name
    return collection_header
}

const make_collection_content = (id, type) => {
    const collection_content = document.createElement('div')
    collection_content.setAttribute('class', 'collection_content '+type)
    collection_content.setAttribute('id', id)
    return collection_content
}

const make_day = (day_name) => {
    const collection = document.createElement('div')
    collection.setAttribute('class', 'collection day')

    collection.appendChild(make_collection_header(day_name))
    collection.appendChild(make_collection_content(day_name+'_main_1', 'main'))
    collection.appendChild(make_collection_content(day_name+'_mini_1', 'mini'))
    collection.appendChild(make_collection_content(day_name+'_main_2', 'main'))
    collection.appendChild(make_collection_content(day_name+'_mini_2', 'mini'))
    collection.appendChild(make_collection_content(day_name+'_main_3', 'main'))

    return collection
}

const make_pantry = (pantry_name) => {
    const collection = document.createElement('div')
    collection.setAttribute('class', 'collection pantry '+pantry_name)

    collection.appendChild(make_collection_header(pantry_name))
    collection.appendChild(make_collection_content(pantry_name+'_main', 'main'))

    return collection
}

const make_item = (title, type) => {
    const item_div = document.createElement('div')
    item_div.setAttribute('class', 'item '+type)
    item_div.setAttribute('data-id', title)
    item_div.setAttribute('name', title)
    item_div.textContent=title
    return item_div
}

const calendar_row = document.getElementById("calendar_row");
const days = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom',]
days.forEach((day_name)=>{
    calendar_row.appendChild(make_day(day_name))
})

const pantry_row = document.getElementById("pantry_row");
const pantries = [
    'veg', 'legumes', 'cereal', 'fruit', 'seednuts', 'dressing','process', 'misc'
    ]

pantries.forEach((pantry)=>{
    const pantry_div = make_pantry(pantry)
    pantry_row.appendChild(pantry_div)
})

const pantry_sortables = Array.from(pantry_row.getElementsByClassName('collection_content'))
    .map((item)=>{
        Sortable.create(item, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false,
            },
            sort: false,
            multiDrag: true,
            selectedClass: 'selected',
        })
    })

const clean_pantries = () => {
    Array.from(pantry_row.getElementsByClassName('item'))
    .forEach(target => target.remove())
}

const fill_pantries = (pantries) => {
    clean_pantries()
    Object.entries(pantries).forEach(([pantry_name, food]) => {
        const pantry_div = pantry_row.getElementsByClassName('collection pantry '+pantry_name)[0]
        const pantry_content = pantry_div.getElementsByClassName('collection_content')[0]
        Object.entries(food).forEach(([food_name, nutri_facts])=> {
            pantry_content.appendChild(make_item(food_name, pantry_name))
        })
    })
}

const handleFile = ([file, ...other]) => {
    const reader = new FileReader();
    reader.onload = r => {
        localStorage.setItem("pantries", r.target.result)
        const new_pantries = jsyaml.load(r.target.result)
        fill_pantries(new_pantries)
    }
    reader.readAsText(file);
}

let local_pantries = localStorage.getItem("pantries")
if (local_pantries) {
    fill_pantries(jsyaml.load(local_pantries))
}

const load_menu_items = (pantry_div, item_ids) => {
    item_ids.forEach((item_id) => {
        const item_div = pantry_row.querySelector(".item[name='"+item_id+"']")
        if (item_div) {
            pantry_div.appendChild(item_div.cloneNode(true))
        }
    })

}

const calendar_sortables = Array.from(calendar_row.getElementsByClassName('collection_content'))
    .map((item)=>{
        Sortable.create(item, {
            group: 'shared',
            removeOnSpill: true,
            multiDrag: true,
            selectedClass: 'selected',
            store: {
                get: ({el}) => {
                    const item_string = localStorage.getItem(el.id)
                    if (item_string) {
                        const item_ids = item_string.split('|')
                        load_menu_items(el, item_ids)
                        return item_ids
                    } else {
                        return []
                    }
                },
                set: (s) => {
                    console.debug(s.el.id, s.toArray())
                    localStorage.setItem(s.el.id, s.toArray().join('|'))
                },
            },
       })
    })

const clean_menu = () => {
    Array.from(calendar_row.getElementsByClassName('item'))
    .forEach(target => target.remove())

    const aux_pantry = localStorage.getItem("pantries")
    localStorage.clear()
    localStorage.setItem("pantries", aux_pantry)
}

clean_menu_btn.onclick = () => {
    if(confirm('Delete your menu?')) {
        clean_menu()
    }
}

clean_pantry_btn.onclick = () => {
    if(confirm('Delete your pantry?')) {
        clean_pantries()
    }
}
