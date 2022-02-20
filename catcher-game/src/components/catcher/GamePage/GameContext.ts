import React from 'react'
import { ICatcher } from '../../../hooks/useCatcher'
import { IDroppingItem } from '../../../hooks/useDroppingItem'

interface IGameContextProps {

}

export const GameContext = React.createContext({} as IGameContextProps)
