import "@mantine/core/styles.css";
import { Button, Card, MantineProvider, Text } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      123
      <Card>
        <Text>Hello</Text>
        <Button>Click me</Button>
      </Card>
    </MantineProvider>
  );
}

export default App;
