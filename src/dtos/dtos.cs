public class User
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required byte[] PasswordHashWithSalt { get; set; }
    public required byte[] Salt { get; set; }
    public required string Email { get; set; }
    public required DateTime JoinTime { get; set; }
    public string? CatchPhrase { get; set; }
    public string? PictureURL { get; set; }
}

public class LoginDTO
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}

public class CreateUserDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? ID { get; set; }
}

public class UserReturnDTO
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string ID { get; set; }
}

public class UserListingDTO
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required DateTime JoinTime { get; set; }
    public string? CatchPhrase { get; set; }
    public string? PictureURL { get; set; }
}

public class ProfileUpdateDTO
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required string CatchPhrase { get; set; }
    public required string PictureURL { get; set; }
}

public class PostDTO
{
    public string PostID { get; set; } = Guid.NewGuid().ToString();
    public required string PosterID { get; set; }
    public required string Post { get; set; }
    public string? PictureURL { get; set; }
    public List<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
    public List<string> Likes { get; set; } = new List<string>();
    public List<string> Dislikes { get; set; } = new List<string>();
}

public class CreatePostDTO
{
    public required string PosterID { get; set; }
    public required string Post { get; set; }
    public string? PictureURL { get; set; }
}

public class CommentDTO
{
    public string CommentID { get; set; } = Guid.NewGuid().ToString();
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
    public required string Comment { get; set; }
}

public class NewCommentDTO
{
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
    public required string Comment { get; set; }
}

public class DeletePostDTO
{
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
}

public class DeleteCommentDTO
{
    public required string CommentID { get; set; }
    public required string PosterID { get; set; }
}

public class OpinionDTO
{
    public required string PostID { get; set; }
    public required string UserID { get; set; }
    public required bool Opinion { get; set; }
}