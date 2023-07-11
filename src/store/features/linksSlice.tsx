import { selectedLinks } from '@/lib/selected-links';
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {v4 as uuid} from 'uuid'
import { string } from 'zod';

export interface Link {
  id:string;
  platform:string;
  // link:string;
  url: string;
  userid:string;
}

export type SelectedLink = {
  image:string,
  label:string;
}

export interface InitialState {
  links:Link[];
  selectedLink:SelectedLink;
  selectLinks:{id:string | number; image:string; label:string;}[]
}

const links:Link[] = [
  {id:uuid(), url:'', platform:'', userid:''}
]

const initialState:InitialState = {
  links:[],
  selectedLink:{
    image:'',
    label:''
  },
selectLinks:selectedLinks
}


const linksSlice = createSlice({
  name:'links/all-links',
  initialState,
  reducers:{
    addLinks:(state:InitialState, {payload}:{payload:Link[]}) => {
      state.links= payload;
    },
    setSelectedLink:(state:InitialState, action:PayloadAction<SelectedLink>) => {
      state.selectedLink = action.payload
    }, 
    addLink:(state, action:PayloadAction<Link>) => {
      state.links = [...state.links, action.payload]
    },
    handleLinkChange:(state:InitialState, action:PayloadAction<{link:{id:string}, linkValue:string}>) => {
      const linkText =  state.links.find((link) => link.id === action.payload.link.id)
      if(linkText) {
        linkText.url = action.payload.linkValue
        return
      }
      throw new Error('link text is undefined')
    },

    handleSelectChange:(state:InitialState, action:PayloadAction<{link:{id:string}, platform:string}>) => {
      const linkText =  state.links.find((link) => link.id === action.payload.link.id)
      if(linkText) {
        linkText.platform = action.payload.platform
        return
      }
      throw new Error('link text is undefined')
    }
  },
}
)

export const {addLinks, addLink, handleLinkChange, setSelectedLink, handleSelectChange} = linksSlice.actions

export default linksSlice.reducer
