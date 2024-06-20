import { useState } from "react";
import { Container, VStack, Heading, Input, Button, FormControl, FormLabel, Textarea, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SubmitRecipe = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, image, link, ratings: [rating] };
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...existingRecipes, newRecipe]));
    navigate("/");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="2xl">Submit a New Recipe</Heading>
        <FormControl id="title" isRequired>
          <FormLabel>Recipe Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Image URL</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </FormControl>
        <FormControl id="link" isRequired>
          <FormLabel>Recipe Link</FormLabel>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </FormControl>
        <FormControl id="rating" isRequired>
          <FormLabel>Rating</FormLabel>
          <HStack spacing={1}>
            {Array(5).fill("").map((_, i) => (
              <FaStar
                key={i}
                color={i < rating ? "gold" : "gray"}
                onClick={() => setRating(i + 1)}
                cursor="pointer"
              />
            ))}
          </HStack>
        </FormControl>
        <Button type="submit" colorScheme="teal" size="lg">Submit Recipe</Button>
      </VStack>
    </Container>
  );
};

export default SubmitRecipe;