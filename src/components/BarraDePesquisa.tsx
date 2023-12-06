import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
export function BarraDePesquisa() {
  return (
    <footer className="">
      <Container>
        <div className="flex-col items-center md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex w-full justify-center md:w-auto">
            <TextField
                type="text"
                aria-label="Cerveja ...."
                placeholder="Cerveja ...."
                required
                className="w-60 min-w-0 shrink"
            />
            <Button type="submit" color="cyan" className="ml-4 flex-none">
              <span className="hidden lg:inline">Encontrar Produto</span>
              <span className="lg:hidden">Encontrar Produto</span>
            </Button>
          </form>
        </div>
      </Container>
    </footer>
  )
}
