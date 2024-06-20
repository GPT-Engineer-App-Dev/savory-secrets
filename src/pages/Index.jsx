import { Container, Text, VStack, Heading, Box, Image, SimpleGrid, Link, Flex, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Recipe Sharing Website</Heading>
        <Text fontSize="xl">Discover and share your favorite recipes!</Text>
        <Button colorScheme="teal" size="lg" onClick={() => navigate("/submit-recipe")}>Submit a Recipe</Button>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
          {recipes.map((recipe, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={recipe.image} alt={recipe.title} />
              <Box p={6}>
                <Heading as="h3" size="lg" mb={4}>{recipe.title}</Heading>
                <Link href={recipe.link} color="teal.500" isExternal>
                  View Recipe <FaExternalLinkAlt />
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;