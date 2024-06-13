import { Refine } from '@refinedev/core'
import { dataProvider } from './data-provider'
import { ShowPoduct } from './pages/products/show'
import { EditProduct } from './pages/products/edit'
import { ListProducts } from './pages/products/list'

function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowPoduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
    </Refine>
  )
}

export default App
