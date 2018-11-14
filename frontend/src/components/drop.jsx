import React from "react";
import ImageUploader from "react-images-upload";

export default class Drop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  render() {
    return (
      <ImageUploader
        withLabel={false}
        withIcon={false}
        buttonText="Choose images"
        onChange={this.onDrop}
        withPreview={true}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}
