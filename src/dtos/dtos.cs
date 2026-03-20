//Til reference

public class LoginDTO //Data til at kunne logge ind
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}

public class CreateUserDTO //Data til at oprette en ny profil
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? ID { get; set; } //Sættes af server, skal ikke medgives
}

public class UserReturnDTO //Login data serveren sender retur efter oprettelse/login
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string ID { get; set; }
}

public class UserListingDTO //Data serveren sender ud til brugere om hvilke brugere der findes på siden
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required DateTime JoinTime { get; set; }
    public string? CatchPhrase { get; set; }
    public string? PictureURL { get; set; }
}

public class ProfileUpdateDTO //Data til at lave ændringer på éns profil
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required string CatchPhrase { get; set; }
    public required string PictureURL { get; set; }
}

public class PostDTO //Data serveren sender til brugeren om post + likes + dislikes + kommentarer
{
    public string PostID { get; set; } = Guid.NewGuid().ToString();
    public required string PosterID { get; set; }
    public required string Post { get; set; }
    public string? PictureURL { get; set; }
    public List<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
    public List<string> Likes { get; set; } = new List<string>();
    public List<string> Dislikes { get; set; } = new List<string>();
}

public class CreatePostDTO //Data til at kunne oprette en ny post
{
    public required string PosterID { get; set; }
    public required string Post { get; set; }
    public string? PictureURL { get; set; }
}

public class CommentDTO //Data serveren sender til brugeren om kommentarer (sendes inde i Posts - teknisk set ikke en reel DTO, mere en data lagrings template)
{
    public string CommentID { get; set; } = Guid.NewGuid().ToString();
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
    public required string Comment { get; set; }
}

public class NewCommentDTO //Data til kunne oprette en ny kommentar
{
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
    public required string Comment { get; set; }
}

public class DeletePostDTO //Finder post og verificerer bruger inden sletning af post
{
    public required string PostID { get; set; }
    public required string PosterID { get; set; }
}

public class DeleteCommentDTO //Finder kommentar og verificerer bruger inden sletning af kommentar
{
    public required string CommentID { get; set; }
    public required string PosterID { get; set; }
}

public class OpinionDTO //Data der skal bruges for at indikere et like på en specifik post
{
    public required string PostID { get; set; }
    public required string UserID { get; set; }
    public required bool Opinion { get; set; }
}