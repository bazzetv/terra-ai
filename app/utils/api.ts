import axios from 'axios';
import Config from 'react-native-config';

const apiToken = Config.REPLICATE_API_TOKEN;

// Fonction pour générer l'image
export const generateImage = async (prompt: string) => {
  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "22ef0a90d798191183772dda577cf21d83b801d9791ba050d26652cba9dc03a2",
        input: {
          model: 'dev',
          prompt: prompt,
          go_fast: false,
          lora_scale: 1,
          megapixels: "1",
          num_outputs: 3, // Nombre d'images à générer
          aspect_ratio: "16:9",
          output_format: "webp",
          guidance_scale: 3,
          output_quality: 50,
          prompt_strength: 0.8,
          extra_lora_scale: 1,
          num_inference_steps: 28
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image :', error);
    throw new Error('Erreur lors de la génération de l\'image');
  }
};

// Fonction pour surveiller l'état de la génération
export const monitorGeneration = async (id: string, setStatus: Function, setImageUrls: Function, setLoading: Function) => {
  try {
    const checkStatus = async () => {

      const statusResponse = await axios.get(
        `https://api.replicate.com/v1/predictions/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
          },
        }
      );

      const { status, output } = statusResponse.data;

      if (status === 'succeeded') {
        setImageUrls(output); // Mettre à jour les URLs des images
        setStatus('succeeded');
        setLoading(false);
      } else if (status === 'failed') {
        setStatus('failed');
        setLoading(false);
      } else {
        setTimeout(() => checkStatus(), 2000); // Vérifier à nouveau après 2 secondes
      }
    };

    checkStatus();
  } catch (error) {
    console.error('Erreur lors du suivi de la génération :', error);
    setStatus('failed');
    setLoading(false);
  }
};