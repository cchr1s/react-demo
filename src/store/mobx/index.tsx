import { FC, createContext, useContext } from 'react'
import demo from './demo'

const createStore = () => ({ demo })

const storeValue = createStore()

type TStore = ReturnType<typeof createStore>

const StoreContext = createContext<TStore | null>(null)

export const StoreProvider: FC = ({ children }) => {
    return <StoreContext.Provider
        value={storeValue}
    >
        {children}
    </StoreContext.Provider>
}

export const useStore = () => {
    const store = useContext(StoreContext);
    if(!store) {
        throw new Error('no store !')
    }

    return store!;
}