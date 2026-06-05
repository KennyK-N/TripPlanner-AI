import Accordion from "@components/ui/Accordion";
import expandAccordion from "@/hooks/expandAccordion";
import ComponentCard from "@components/common/ComponentCard";

const accordionItems = [
  {
    id: 0,
    title: "test",
    description: (
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio earum
        quaerat architecto cupiditate culpa nobis dolore dolor, quos eius,
        expedita, eaque animi officia eos vel a ut modi? Molestias, ad.
      </div>
    ),
    value: false,
  },
  { id: 1, title: "test", description: "test", value: false },
  { id: 2, title: "test", description: "test", value: false },
  { id: 3, title: "test", description: "test", value: false },
  { id: 4, title: "test", description: "test", value: false },
];

export default function About() {
  const { expand, setExpandedValue } = expandAccordion(accordionItems);
  console.log(expand);
  return (
    <div className="space-y-6 md:ml-[10%] md:mr-[10%]">
      <ComponentCard title="About">
        {expand.map((prev) => (
          <div key={prev.id} className="mb-10">
            <Accordion
              id={prev.id}
              setExpanded={setExpandedValue}
              expand={prev.value}
              title={prev.title}
              description={prev.description}
            ></Accordion>
          </div>
        ))}
      </ComponentCard>
    </div>
  );
}
