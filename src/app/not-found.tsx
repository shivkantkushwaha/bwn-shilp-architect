import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { Button } from '@/components/Button';
import { SectionDrawing } from '@/components/drawings/SectionDrawing';

export default function NotFound() {
  return (
    <div className="py-20 lg:py-32 bg-paper min-h-[70vh] flex items-center">
      <Container>
        <div className="max-w-3xl mx-auto border border-hairline bg-paper-deep p-8 sm:p-12 text-center">
          <SheetLabel className="block mb-4">
            SHEET ERR-404 // DRAWING NOT FOUND
          </SheetLabel>

          <h1 className="font-display text-4xl sm:text-5xl font-light text-ink mb-4">
            Unreferenced Coordinate
          </h1>

          <p className="font-body text-ink-soft text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            The page or architectural drawing you requested is not indexed in this sheet set. Please check the address or return to the main index.
          </p>

          <div className="my-8 max-w-lg mx-auto opacity-75 border border-hairline">
            <SectionDrawing />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary">
              Return to Drawing Index
            </Button>
            <Button href="/projects" variant="outline">
              View Selected Work
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
